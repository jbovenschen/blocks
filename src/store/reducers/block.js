import { BLOCK, GAME } from '../constants'

const initialState = {
  piece: null,
  rotation: null,
  position: {
    x: null,
    y: null
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case BLOCK.CREATE:
      return Object.assign(
        {},
        initialState,
        action.payload
      )
    case BLOCK.UPDATE:
      return Object.assign(
        {},
        state,
        action.payload
      )
    case BLOCK.FREEZE:
      return Object.assign(
        {},
        initialState
      )
    case GAME.RESET:
      return Object.assign(
        {},
        initialState
      )
    default:
      return state
  }
}

export { reducer }
