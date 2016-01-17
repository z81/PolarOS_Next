import { createAction, handleActions } from 'redux-actions'
import gq from '../../../vendors/gq'

let initState = []
// ------------------------------------
// Constants
// ------------------------------------
export const APPS_RUN = 'APPS_RUN'
export const APPS_SET_LIST = 'APPS_SET_LIST'
// ------------------------------------
// Actions
// ------------------------------------
export const runApp =  createAction(APPS_RUN, (payload) => payload)
export const setAppsList =  createAction(APPS_SET_LIST, (payload) => payload)


export const actions = {
  runApp,
  setAppsList
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [APPS_RUN]: (state, { payload: app }) => {
    console.log(payload)
    return payload
  },
  [APPS_SET_LIST]: (state, { payload }) => {
    payload.map((app) => app.manifest = JSON.parse(app.manifest))
    return payload
  }
}, initState)
