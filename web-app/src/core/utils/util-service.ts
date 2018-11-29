export const paths = {
  apiKey: '?api_key=60773f18ef6a7a9ee3d4a640fab964eb',
  apiUrl: 'https://api.themoviedb.org/3',
  imgPath45: 'http://image.tmdb.org/t/p/w45',
  imgPath92: 'http://image.tmdb.org/t/p/w92',
  imgPath154: 'http://image.tmdb.org/t/p/w154',
  imgPath185: 'http://image.tmdb.org/t/p/w185',
  imgPath500: 'http://image.tmdb.org/t/p/w500',
  localhost: 'http://localhost:5000',
  posterPath780: 'http://image.tmdb.org/t/p/w780',
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
  const fromDate = yy + '-' + mm + '-' + dd;
  let lastDay = dd - 1;
  lastDay = (lastDay) ? lastDay : lastDay+1;
  const toDate = yy + '-' + (mm-1) + '-' + lastDay;
  return {fromDate, toDate};
};

export const appErrors = {
  apiError: `Something has gone wrong with your request. Please try again later.`,
  loginError: `Your login credentials are not correct. Please try again using correct details.`,
  userExist: `A user with this email has already exisisted. Please provide a different email address!`,
  passwordMatch: `Your password does not match, Please type again!`,
  tokenExpired: `Your token has been expired please request a new token`
};


// export const round = (value: string, decimals: number = 1): any => {
  
//   return Number(Math.round(`${value}e${decimals}`)+'e-'+decimals);
// };
// export default round;

// export const apiUrl = (pageNo) => {
//   const {toDate, fromDate} = toFromDates();
//   return {
//     defaultUrl: `${paths.apiUrl}/discover/movie${paths.apiKey}&page=${pageNo}`
//     inCinemas: `${paths.apiUrl}/movie/now_playing${paths.apiKey}&language=en-US&page=${pageNo}`,
//     latest: `${paths.apiUrl}/discover/movie?primary_release_date.gte=${toDate}&primary_release_date.lte=${fromDate}&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`,
//     popular: `${paths.apiUrl}/movie/popular${paths.apiKey}&language=en-US&page=${pageNo}`,
//     topRated: `${paths.apiUrl}/movie/top_rated${paths.apiKey}&language=en-US&page=${pageNo}`,
//     upComing: `${paths.apiUrl}/movie/upcoming${paths.apiKey}&page=${pageNo}`,
//   }
// };
