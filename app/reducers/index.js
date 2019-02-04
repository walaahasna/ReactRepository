import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
 import AddressReducer from './AddressReducer';
 import OrderReducer from './OrderReducer';
 import NotificationReducer from './NotificationReducer';
import AboutReducer from './AboutReducer';

export default combineReducers({
  auth: AuthReducer,
  address: AddressReducer,
  order: OrderReducer,
  notification:NotificationReducer,
about:AboutReducer
});
