import { atom, action } from 'nanostores';



export const isLoggedIn = atom(false);
export const login = (data: any) => {

  isLoggedIn.set(data)
}