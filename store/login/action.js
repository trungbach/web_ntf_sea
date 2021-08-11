export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const loginAccount = (payload) => (dispatch) => {
  return dispatch({ type: actionTypes.LOGIN, payload })
}

export const logoutAccount = () => (dispatch) => {
  return dispatch({ type: actionTypes.LOGOUT })
}
