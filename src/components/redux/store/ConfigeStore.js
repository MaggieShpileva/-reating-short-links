import { createStore } from 'redux';
import { userData } from '../reducers/userData';
export const store = createStore(userData);
