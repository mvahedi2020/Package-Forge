import {BASELINE,CATALOG,CLOCK,parseState,seed,validDraft,type Draft,type State} from './domain'
export const STORAGE_KEY='package-forge:v1'
function invalidSavedReason(raw:string):string {
 try{const s=JSON.parse(raw);if(Array.isArray(s?.history)){if(s.history.some((q:{expires?:unknown})=>typeof q?.expires==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(q.expires)&&q.expires<CLOCK))return 'Saved quote is expired against the fixed sample clock.';if(s.history.some((q:{catalog?:unknown;baseline?:unknown})=>q?.catalog!==CATALOG||q?.baseline!==BASELINE.version))return 'Saved quote refers to a stale catalog or baseline.'}if(s?.draft&&!validDraft(s.draft as Draft))return 'Saved assumptions are invalid or unsupported.'}catch{/* Malformed records retain the generic recovery explanation. */}
 return 'Saved data is unknown, corrupt, or inconsistent.'
}
export interface ResetToken {raw:string|null;memory:string}
export class LocalStore {
 state:State=seed(); raw:string|null=null; blocked=false; readFailed=false; warning=''
 constructor(){try{this.raw=window.localStorage.getItem(STORAGE_KEY);if(this.raw!==null){const parsed=parseState(this.raw);if(parsed)this.state=parsed;else{this.blocked=true;this.warning=invalidSavedReason(this.raw)+' It is preserved. Reset explicitly to replace it.'}}}catch{this.readFailed=true;this.warning='Local storage is unavailable. Work stays in memory; refreshing may lose it.'}}
 check():boolean {
  try{const raw=window.localStorage.getItem(STORAGE_KEY);this.readFailed=false;if(raw!==this.raw){this.blocked=true;this.warning='Saved data changed outside this worksheet. Confirmation is blocked. Reload compatible data or preview a reset.';return false}}
  catch{this.readFailed=true;this.warning='Local storage cannot be read. Current work stays in memory; refreshing may lose it.'}
  return !this.blocked
 }
 captureReset():ResetToken|null {try{return {raw:window.localStorage.getItem(STORAGE_KEY),memory:JSON.stringify(this.state)}}catch{this.warning='Reset cannot be reviewed while saved data is unreadable. Original data and current memory are preserved.';return null}}
 save(next:State,reset=false,token?:ResetToken|null):boolean {
  if(!parseState(JSON.stringify(next))){this.warning='State limit or inconsistent change rejected. Current memory is preserved; preview a sample reset to recover.';return false}
  if(reset){
   try{if(!token||token.memory!==JSON.stringify(this.state)||window.localStorage.getItem(STORAGE_KEY)!==token.raw){this.warning='Reset preview is stale or saved data is unreadable. Current memory and saved data are preserved; open a fresh reset preview.';return false}}catch{this.warning='Reset cannot be confirmed while saved data is unreadable. Original data and current memory are preserved.';return false}
   try{const raw=JSON.stringify(next);window.localStorage.setItem(STORAGE_KEY,raw);this.raw=raw;this.state=next;this.blocked=false;this.readFailed=false;this.warning='';return true}catch{this.warning='Reset could not be saved. Original data and current memory are preserved.';return false}
  }
  if(!this.check())return false
  this.state=next
  if(this.readFailed)return true
  try{const raw=JSON.stringify(next);window.localStorage.setItem(STORAGE_KEY,raw);this.raw=raw;this.warning=''}catch{this.warning='Local storage cannot be written. Current work stays in memory; refreshing may lose it.'}
  return true
 }
}
