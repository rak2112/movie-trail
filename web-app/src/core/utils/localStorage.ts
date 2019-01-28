export const loadState = (item: string) => {
  try {
    const serializedUser = window.sessionStorage.getItem(item);
    if(serializedUser === null) {
      return undefined;
    }
    return JSON.parse(serializedUser);
  }
  catch (err) { return undefined; }
};

export const saveState = (key: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    window.sessionStorage.setItem(key, serializedState);
  }
  catch (err) {
    console.log('err');
  }
}
