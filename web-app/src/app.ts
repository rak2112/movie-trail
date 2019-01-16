import configureStore from './core/store/configureStore';
import { httpFactory } from './core/utils/http';


export const store = configureStore();
export const http = httpFactory(store);
