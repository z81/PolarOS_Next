import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import windows from './modules/windows'
import user from './modules/user'
import userApps from './modules/userApps'

export default combineReducers({
  windows,
  counter,
  user,
  userApps,
  router
})
