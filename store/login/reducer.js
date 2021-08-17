import { actionTypes } from './action'
import Cookies from 'js-cookie'

const initialState = {
  isLoggedIn: Cookies.get('token') === undefined ? false : true,
  user: Cookies.get('token') !== undefined ? JSON.parse(Cookies.get('user')) : undefined,
  isOpenWallet: false
}

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case actionTypes.LOGIN: 
      Cookies.set('token', action.payload.token)
      Cookies.set('user', JSON.stringify(action.payload.user))
      return {...state, isLoggedIn: true, user: JSON.parse(Cookies.get('user'))}

    case actionTypes.LOGOUT:
      Cookies.remove('token')
      Cookies.remove('user')
      return {...state, isLoggedIn: false, user: undefined}

    case actionTypes.UPDATE_PROFILE:
      Cookies.set('user', JSON.stringify(action.payload))
      return {...state, user: action.payload}

    case actionTypes.OPEN_WALLET:
      return {...state, isOpenWallet: true}
    
    case actionTypes.TOGGLE_WALLET:
      return {...state, isOpenWallet: !state.isOpenWallet}

    default:
      return state
  }
  
}
