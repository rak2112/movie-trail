export const loadState = (item: string) => {
  try {
    const serializedUser = localStorage.getItem(item);
    if(serializedUser === null) {
      return undefined;
    }
    return JSON.parse(serializedUser);
  }
  catch (err) { return undefined; }
};

export const saveState = (user: string, state: any) => { console.log('userrr save state', state)
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(user, serializedState);
  }
  catch (err) {
    console.log('err');
  }
}
