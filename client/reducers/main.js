import { UPDATE_SALES_BASE } from '../actions/main'

const INITIAL_STATE = {
  state_main: 'ABC'
}

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SALES_BASE:
      return { ...state }

    default:
      return state
  }
}

export default main
