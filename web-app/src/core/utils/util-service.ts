import { v4 } from 'uuid';

export const getUuid = () => {
  return v4();
};

export const paths = {
  apiKey: '?api_key=60773f18ef6a7a9ee3d4a640fab964eb',
  apiUrl: 'https://api.themoviedb.org/3',
  imgPath45: 'https://image.tmdb.org/t/p/w45',
  imgPath92: 'https://image.tmdb.org/t/p/w92',
  imgPath154: 'https://image.tmdb.org/t/p/w154',
  imgPath185: 'https://image.tmdb.org/t/p/w185',
  imgPath500: 'https://image.tmdb.org/t/p/w500',
  localhost: 'http://localhost:5000',
  posterPath780: 'https://image.tmdb.org/t/p/w780',
  appKey: '&api_key=60773f18ef6a7a9ee3d4a640fab964eb',
};

export const menuData = [
  {id:0, routeName: '/home', displayName: 'Home'},
  {id:1, routeName:'/movies', displayName:'All Movies'},
  {id:2, routeName:'/latest', displayName:'Latest'},
  {id:3, routeName:'/popular', displayName:'Popular'},
  {id:4, routeName:'/upComing', displayName:'Up Coming'}
];

export const toFromDates = () => {
  const d = new Date();
  const dd = d.getDate();
  const mm = d.getMonth()+ 1;
  const yy = d.getFullYear();

  const fromDate = `${yy}-${mm}-${dd}`;
  
  const lastDay = dd - 1;
  const toDate = `${(mm === 1 ) ? yy-1 : yy}-${(mm === 1 ) ? 12 : mm-1}-${(lastDay) ? lastDay : lastDay+1}`;
  return {fromDate, toDate};
};

export const initialsUpperCase = (name: string = '') => name.split(' ').map((str) => str.charAt(0)).join('').toUpperCase();

export const appErrors = {
  apiError: `Something has gone wrong with your request. Please try again later.`,
  loginError: `Your login credentials are not correct. Please try again using correct details.`,
  userExist: `A user with this email has already exisisted. Please provide a different email address!`,
  passwordMatch: `Your password does not match, Please type again!`,
  tokenExpired: `Your token has been expired please request a new token`,
  emailNotFound: `Account with this email address does not exist.`
};
