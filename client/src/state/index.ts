import { atom } from 'recoil';

export const debugState = atom({
  key: 'debugState',
  default: []
});

// setDebug((oldDebug: any) => {
//   return oldDebug.concat([JSON.stringify({controlType, x, y, force})]);
// })
