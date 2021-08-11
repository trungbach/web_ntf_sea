import { actionTypes } from './action'
import Cookies from 'js-cookie'

const initialState = {
  isLoggedIn: Cookies.get('token') === undefined ? false : true,
  isOpenWallet: false
}

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case actionTypes.LOGIN:
      Cookies.set('token', action.payload)
      return {...state, isLoggedIn: true}

    case actionTypes.LOGOUT:
      Cookies.remove('token')
      return {...state, isLoggedIn: false}

    case actionTypes.OPEN_WALLET:
      return {...state, isOpenWallet: true}
    
    case actionTypes.TOGGLE_WALLET:
      return {...state, isOpenWallet: !state.isOpenWallet}

    default:
      return state
  }
  
}
