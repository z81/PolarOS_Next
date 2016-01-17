import { createAction, handleActions } from 'redux-actions'
import gq from '../../../vendors/gq'
//import { setWindowsList } from './windows'

window.gq = gq



let initState = {}
// ------------------------------------
// Constants
// ------------------------------------
export const USER_LOAD = 'USER_LOAD'
export const USER_LOGIN = 'USER_LOGIN'
export const SET_WALLPAPER = 'SET_WALLPAPER'
// ------------------------------------
// Actions
// ------------------------------------
export const setWallpaper = createAction(SET_WALLPAPER, (value) => value)
export const loadUser = createAction(USER_LOAD, (value) => value)
export const loginUser = createAction(USER_LOGIN, (value) => value)
export const loadUserAsync = (props) => {
  return (dispatch, getState) => {
    const token = localStorage.user ? JSON.parse(localStorage.user).token : ''
    gq(`
      fragment appsFields on App{
        id
        name
        manifest
        url
      }

      query($token: String) {
        users (token: $token){
        	id
        	name
          email
          token
          background
          wallpapers {
            name
          }
          windows {
            id
            width
            height
            top
            left
            title
            app {
              ...appsFields
            }
          }
          apps {
            ...appsFields
          }
        }
    }
    `, {token: token}).then((data)=> {
      if (data.users && data.users.length) {
        localStorage.token = data.users[0].token

        props.setWindowsList(data.users[0].windows)
        props.setAppsList(data.users[0].apps)
      }

      dispatch(loadUser(data.users[0]))
    })


  }
}
// TODO: Add all fileds
export const loginUserAsync = (payload) => {
  return (dispatch, getState) => {
    gq(`query auth($login: String!, $pass: String!) {
      users (login: $login, password: $pass){
      	id
      	name
        token
        email
      }
    }
  `, payload).then((data)=> {
      dispatch(loginUser(data))
    })


  }
}



export const actions = {
  loadUser,
  loadUserAsync,
  loginUser,
  loginUserAsync,
  setWallpaper
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [USER_LOAD]: (state, { payload }) => {
    return payload
  },
  [USER_LOGIN]: (state, { payload }) => {
    let newState = {}
    if (!('errors' in payload)) {
      newState = payload.users[0]
      localStorage.user = JSON.stringify(newState)
    }
    return Object.assign({}, state, newState)
  },
  [SET_WALLPAPER]: (state, { payload }) => {
    gq(`
      mutation ($background: String!, $token: String) {
          updateUser(background: $background,  token: $token)  {
            background: background
            token: token
          }
     }
     `, {token: state.token, background: payload})

    return Object.assign({}, state, {background: payload})
  }
}, initState)
