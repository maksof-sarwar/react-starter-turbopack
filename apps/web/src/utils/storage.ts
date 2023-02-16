import Storage, { TStoragetype } from '@itzsunny/storageapi';


export const [
  localStorage, sessionStorage
] = ["LOCAL", "SESSION"].map(s => new Storage(s as TStoragetype))
