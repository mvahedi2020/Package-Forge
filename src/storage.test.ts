import {afterEach,expect,it,vi} from 'vitest'
import {LocalStore,STORAGE_KEY} from './storage'
import {seed} from './domain'
afterEach(()=>vi.unstubAllGlobals())
function storage(raw:string|null=null){const data=new Map<string,string>();if(raw!==null)data.set(STORAGE_KEY,raw);const api={getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v)}};vi.stubGlobal('window',{localStorage:api});return {data,api}}
it('compatible refresh loads exact memory',()=>{storage(JSON.stringify(seed()));expect(new LocalStore().state).toEqual(seed())})
it('unknown storage survives ordinary save',()=>{const {data}=storage('{bad');const st=new LocalStore();expect(st.save(seed())).toBe(false);expect(data.get(STORAGE_KEY)).toBe('{bad');expect(st.save(seed(),true)).toBe(true)})
it('same revision different content rejects a pending mutation',()=>{const {api}=storage(JSON.stringify(seed()));const st=new LocalStore();api.setItem(STORAGE_KEY,JSON.stringify({...seed(),draft:{...seed().draft,editors:9}}));expect(st.save({...seed(),revision:1})).toBe(false);expect(st.state.draft.editors).toBe(8)})
it('external corruption preserves current memory and raw until reset',()=>{const {data}=storage();const st=new LocalStore();st.save({...seed(),revision:1});data.set(STORAGE_KEY,'corrupt');expect(st.check()).toBe(false);expect(st.state.revision).toBe(1);expect(data.get(STORAGE_KEY)).toBe('corrupt');st.save(seed(),true);expect(data.get(STORAGE_KEY)).toBe(JSON.stringify(seed()))})
it('localStorage getter exception retains work in memory',()=>{vi.stubGlobal('window',Object.defineProperty({},'localStorage',{get(){throw Error('denied')}}));const st=new LocalStore();expect(st.save({...seed(),revision:1})).toBe(true);expect(st.state.revision).toBe(1);expect(st.warning).toContain('memory')})
it('getItem read exception retains work in memory',()=>{vi.stubGlobal('window',{localStorage:{getItem(){throw Error('denied')},setItem(){throw Error('denied')}}});const st=new LocalStore();st.save({...seed(),revision:2});expect(st.state.revision).toBe(2);expect(st.warning).toContain('memory')})
it('write exception retains current memory and explains persistence',()=>{const {api}=storage();api.setItem=()=>{throw Error('quota')};const st=new LocalStore();st.save({...seed(),revision:3});expect(st.state.revision).toBe(3);expect(st.warning).toContain('cannot be written')})
