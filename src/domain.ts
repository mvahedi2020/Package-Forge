export const CLOCK = '2026-10-02'
export const CATALOG = '2026.10-v1'
export const FEATURES = ['Shared boards', 'Approval workflows', 'Audit export'] as const
export type Feature = typeof FEATURES[number]
export type TierId = 'base' | 'studio' | 'archive'
export type Cycle = 'monthly' | 'annual'
export const TIERS = [
  { id: 'base', name: 'Base', monthly: 0, annualMonthly: 0, editors: 3, viewers: 20, features: [FEATURES[0]], note: 'Small teams arranging shared work.' },
  { id: 'studio', name: 'Studio', monthly: 1200, annualMonthly: 1000, editors: 20, viewers: 200, features: [FEATURES[0], FEATURES[1]], note: 'Teams with a review and approval step.' },
  { id: 'archive', name: 'Archive', monthly: 2400, annualMonthly: 2000, editors: 100, viewers: 1000, features: [...FEATURES], note: 'Teams that need a portable audit trail.' },
] as const
export interface Draft { editors: number; viewers: number; needs: Feature[]; cycle: Cycle }
export const SCENARIOS: { id: string; name: string; context: string; draft: Draft }[] = [
  { id:'cedar', name:'Cedar Design', context:'Eight editors need approval workflows; 24 teammates only view.', draft:{editors:8,viewers:24,needs:[FEATURES[0],FEATURES[1]],cycle:'monthly'} },
  { id:'kite', name:'Kite Collective', context:'Two editors share boards with eight free viewers. Review a smaller package.', draft:{editors:2,viewers:8,needs:[FEATURES[0]],cycle:'monthly'} },
  { id:'harbor', name:'Harbor Records', context:'Twelve editors need audit export, with 60 free viewers.', draft:{editors:12,viewers:60,needs:[...FEATURES],cycle:'annual'} },
  { id:'overflow', name:'Widefield Network', context:'101 editors and 1,001 viewers exceed every sample package.', draft:{editors:101,viewers:1001,needs:[FEATURES[0]],cycle:'monthly'} },
]
export const BASELINE = { tier:'studio' as TierId, editors:8, viewers:24, cycle:'monthly' as Cycle, charge:9600, renewal:'2026-10-31', version:'baseline-v1' }
export interface Quote { id: string; version: 1; catalog: string; clock: string; expires: string; baseline: string; effective: string; termEnd: string; tier: TierId; draft: Draft; charge: number; equivalentMonthly: number; revision: number }
export interface State { schema:1; revision:number; draft:Draft; selected:TierId|null; history:Quote[]; scheduled:string|null; canceled:string[] }
export function seed():State { return {schema:1,revision:0,draft:structuredClone(SCENARIOS[0].draft),selected:null,history:[],scheduled:null,canceled:[]} }
export const money = (cents:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents / 100)
export function validDraft(d:Draft):boolean { return !!d && Number.isInteger(d.editors) && d.editors>=0 && d.editors<=10000 && Number.isInteger(d.viewers) && d.viewers>=0 && d.viewers<=10000 && ['monthly','annual'].includes(d.cycle) && Array.isArray(d.needs) && d.needs.every(n=>FEATURES.includes(n)) && new Set(d.needs).size===d.needs.length }
export function fit(tier:TierId,d:Draft):string[] {
  if(!validDraft(d)) return ['Use whole counts from 0 to 10,000.']
  const t=TIERS.find(t=>t.id===tier)!
  return [...d.needs.filter(n=>!(t.features as readonly Feature[]).includes(n)).map(n=>`Missing ${n}`),...(d.editors>t.editors?[`Editor capacity ${t.editors}; need ${d.editors}`]:[]),...(d.viewers>t.viewers?[`Viewer capacity ${t.viewers}; need ${d.viewers}`]:[])]
}
export function cost(tier:TierId,d:Draft) { if(!validDraft(d)) throw new Error('Invalid assumptions'); const t=TIERS.find(t=>t.id===tier)!;const equivalentMonthly=d.editors*(d.cycle==='annual'?t.annualMonthly:t.monthly); return {equivalentMonthly,charge:equivalentMonthly*(d.cycle==='annual'?12:1)} }
// Clamp the same calendar day to the final day of a target month. UTC avoids DST shifts.
export function addMonths(date:string,months:number):string {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isInteger(months)||months<0||months>1200) throw new Error('Invalid calendar input')
  const [y,m,d]=date.split('-').map(Number); const source=new Date(Date.UTC(y,m-1,d));if(source.toISOString().slice(0,10)!==date) throw new Error('Invalid date'); const target=new Date(Date.UTC(y,m-1+months,1));const last=new Date(Date.UTC(target.getUTCFullYear(),target.getUTCMonth()+1,0)).getUTCDate();target.setUTCDate(Math.min(d,last));return target.toISOString().slice(0,10)
}
export function quote(s:State,tier:TierId):Quote {
  if(fit(tier,s.draft).length) throw new Error('Package does not fit')
  return {id:`Q${s.history.length+1}`,version:1,catalog:CATALOG,clock:CLOCK,expires:'2026-10-09',baseline:BASELINE.version,effective:BASELINE.renewal,termEnd:addMonths(BASELINE.renewal,s.draft.cycle==='annual'?12:1),tier,draft:structuredClone(s.draft),...cost(tier,s.draft),revision:s.revision}
}
export function losses(tier:TierId):string[] {const t=TIERS.find(t=>t.id===tier)!;const current=TIERS.find(t=>t.id===BASELINE.tier)!;return [...current.features.filter(n=>!(t.features as readonly Feature[]).includes(n)),...(t.editors<current.editors?[`Editor capacity: ${current.editors} → ${t.editors}`]:[]),...(t.viewers<current.viewers?[`Viewer capacity: ${current.viewers} → ${t.viewers}`]:[])]}
export function confirm(s:State,q:Quote):State { if(s.history.length>=100) throw new Error('History full; reset required');if(s.selected!==q.tier||JSON.stringify(q)!==JSON.stringify(quote(s,q.tier))||q.expires<CLOCK) throw new Error('Quote stale or expired');return {...s,revision:s.revision+1,history:[...s.history,structuredClone(q)],scheduled:q.id} }
export function cancelScheduled(s:State):State {if(!s.scheduled) return s;return {...s,revision:s.revision+1,canceled:[...s.canceled,s.scheduled],scheduled:null} }
export function parseState(raw:string):State|null {
  try {
    const s=JSON.parse(raw) as State
    if(!s||s.schema!==1||!Number.isSafeInteger(s.revision)||s.revision<0||s.revision>1000000||!validDraft(s.draft)||!(s.selected===null||TIERS.some(t=>t.id===s.selected))||!Array.isArray(s.history)||s.history.length>100||!Array.isArray(s.canceled)||new Set(s.canceled).size!==s.canceled.length) return null
    for(let i=0;i<s.history.length;i++) {
      const q=s.history[i];if(!q||!TIERS.some(t=>t.id===q.tier)||!validDraft(q.draft)||!Number.isSafeInteger(q.revision)||q.revision<0||q.revision>=s.revision||(i>0&&q.revision<=s.history[i-1].revision)) return null
      const expected=quote({...seed(),revision:q.revision,draft:q.draft,history:s.history.slice(0,i)},q.tier)
      if(JSON.stringify(q)!==JSON.stringify(expected)) return null
    }
    if(s.canceled.some(id=>!s.history.some(q=>q.id===id))) return null
    if(s.scheduled!==null&&(s.scheduled!==s.history.at(-1)?.id||s.canceled.includes(s.scheduled))) return null
    return s
  } catch {return null}
}
