import { combineReducers } from 'redux'

import { reducer as boardReducer } from './board'
import { reducer as statusReducer } from './status'
import { reducer as blockReducer } from './block'

const reducers = combineReducers({
  board: boardReducer,
  status: statusReducer,
  block: blockReducer
})

export default reducers
