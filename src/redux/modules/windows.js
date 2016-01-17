import { createAction, handleActions } from 'redux-actions'
import gq from '../../../vendors/gq'


// ------------------------------------
// Constants
// ------------------------------------
const WINDOWS_ADD = 'WINDOWS_ADD'
const WINDOWS_SET_ACTIVE = 'WINDOWS_SET_ACTIVE'
const WINDOWS_CLOSE = 'WINDOWS_CLOSE'
const WINDOWS_MIN = 'WINDOWS_MIN'
const WINDOWS_MAX = 'WINDOWS_MAX'
const WINDOWS_UNMIN = 'WINDOWS_UNMIN'
const WINDOWS_CHANGE_POS = 'WINDOWS_CHANGE_POS'
const WINDOWS_LOAD = 'WINDOWS_LOAD'
const WINDOWS_SET_LIST = 'WINDOWS_SET_LIST'

// ------------------------------------
// Actions
// ------------------------------------

export const addWindow = createAction(WINDOWS_ADD, (app) => ({
    title: app.name, //'test ' + Math.ceil(Math.random(1) * 1000),
    app: app,
    left: 50,
    top: 50,
    height: 300,
    width: 300,
    url: app.url,
    token: app.token
}))
export const setActiveWindow = createAction(WINDOWS_SET_ACTIVE, active => active)
export const onClose = createAction(WINDOWS_CLOSE, id => id)
export const onMin = createAction(WINDOWS_MIN, id => id)
export const onUnMin = createAction(WINDOWS_UNMIN, id => id)
export const onMax = createAction(WINDOWS_MAX, id => id)
export const onChangePos = createAction(WINDOWS_CHANGE_POS, data => data)
export const setWindowsList = createAction(WINDOWS_SET_LIST, data => data)

export const onStopDrag = createAction(WINDOWS_CHANGE_POS, data => {
  let win = Object.assign({}, data, {token: localStorage.token})

  gq(`
    mutation ($id: String!, $title: String!,  $top: Int!, $left: Int!, $width: Int!, $height: Int!, $token: String) {
      updateWindow(id: $id, title: $title, top: $top, left: $left, width: $width, height: $height, token: $token)  {
        id: id
        title: title
        top: top
        left: left
        width: width
        height: height
        token: token
      }
    }  `, win)

  return data
})

export const loadWindows = () => {
  return (dispatch, getState) => {
    let goLogin = ()=> document.location.href = "/login"

      //dispatch(getState().user.windows)
    if (localStorage.user && localStorage.user != "") {
        let user = JSON.parse(localStorage.user)

        if (user.token) {
          gq(`
            query($token: String!) {
                users (token: $token){
                  windows {
                    id
                    width
                    height
                    top
                    left
                    title
                  }
                }
            }
          `, {token: user.token}).then((data)=> {
            dispatch(setWindowsList(data.users[0].windows))
          })

          //dispatch(setWindowsList(JSON.parse(localStorage.user).windows))
        } else {
          goLogin()
        }

    } else {
        goLogin()
    }

    //console.error(getState().user)
  }
}
//


export const actions = {
  addWindow,
  setActiveWindow,
  onClose,
  onMin,
  onUnMin,
  onMax,
  onChangePos,
  loadWindows,
  setWindowsList,
  onStopDrag
}
// ------------------------------------
// Reducer
// ------------------------------------
let state = {
  active: 0,
  list: []
}

export default handleActions({
  [WINDOWS_SET_LIST] : (state, { payload: list }) => {
    state.list = Array.from(list)

    return Object.assign({}, state)
  },
  [WINDOWS_ADD] : (state, { payload: win }) => {

    gq(`
      mutation ($app: Int!, $title: String!, $top: Int!, $left: Int!, $width: Int!, $height: Int!, $token: String) {
        addWindow(app: $app, title: $title, top: $top, left: $left, width: $width, height: $height, token: $token)  {
          app: app {
            id
          }
          title: title
          top: top
          left: left
          width: width
          height: height
          token: token
        }
      }  `, Object.assign({}, win, {app: win.app.id}))

    win.id = (new Date()).getTime()
    win.sort = state.list.length * -1
    state.list.push(win)
    return Object.assign({}, state)
  },
  [WINDOWS_SET_ACTIVE] : (state, { payload: active}) => {

    state.list.map((w, i)=> {
      w.sort = (active === w.id) ?  0  :  i + 1;
      return w;
    });

    return Object.assign({}, state);
  },
  [WINDOWS_CLOSE] : (state, { payload: id} ) => {
    gq(`
      mutation ($id: Int!, $token: String) {
          deleteWindow(id: $id, token: $token)  {
            id: id
    				token: token
          }
      }
    `, { id: id, token: localStorage.token })

    let newList = []
    state.list.forEach((w)=> {
      if (id !== w.id) {
        newList.push(w)
      }
    });

    state.list = newList
    return Object.assign({}, state)
  },
  [WINDOWS_MIN] : (state, { payload: id} ) => {
    state.list.map((w)=> {
      if (id === w.id) {
        w.min = true
      }
      return w;
    });

    return Object.assign({}, state)
  },
  [WINDOWS_UNMIN] : (state, { payload: id }) => {
    state.list.map((w)=> {
      if (id === w.id) {
        w.min = false
      }
      return w
    })

    return Object.assign({}, state);
  },
  [WINDOWS_MAX] : (state, { payload: id }) => {
    state.list.map((w)=> {
      if (id === w.id) {
        w.max = true
      }
      return w
    });

    return Object.assign({}, state);
  },
  [WINDOWS_CHANGE_POS] : (state, { payload: data} ) => {

    if (data.position) {
      state.list.map((w)=> {
        if (data.id === w.id) {
          w.left = data.position.left
          w.top = data.position.top
        }
        return w
      })
    }

    return Object.assign({}, state)
  }
}, state)
