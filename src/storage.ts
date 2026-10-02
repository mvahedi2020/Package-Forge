import {parseState,seed,type State} from './domain'
export const STORAGE_KEY='package-forge:v1'
export class LocalStore {
 state:State=seed(); raw:string|null=null; blocked=false; warning=''
 constructor(){try{this.raw=window.localStorage.getItem(STORAGE_KEY);if(this.raw!==null){const parsed=parseState(this.raw);if(parsed)this.state=parsed;else{this.blocked=true;this.warning='Saved data is unknown, corrupt, or inconsistent. It is preserved. Reset explicitly to replace it.'}}}catch{this.warning='Local storage is unavailable. Work stays in memory; refreshing may lose it.'}}
 check():boolean {
  try{const raw=window.localStorage.getItem(STORAGE_KEY);if(raw!==this.raw){this.blocked=true;this.warning='Saved data changed outside this worksheet. Confirmation is blocked. Reload compatible data or preview a reset.';return false}}
  catch{this.warning='Local storage cannot be read. Current work stays in memory; refreshing may lose it.'}
  return !this.blocked
 }
 save(next:State,reset=false):boolean {
  if(!reset&&!this.check())return false
  if(reset){this.blocked=false}
  this.state=next
  try{const raw=JSON.stringify(next);window.localStorage.setItem(STORAGE_KEY,raw);this.raw=raw;this.warning=''}catch{this.warning='Local storage cannot be written. Current work stays in memory; refreshing may lose it.'}
  return true
 }
}
