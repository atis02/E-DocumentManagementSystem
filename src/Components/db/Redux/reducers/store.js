import { legacy_createStore as createStore } from 'redux';
import rootReducers from './index.js';

const store = createStore(rootReducers);

export default store;