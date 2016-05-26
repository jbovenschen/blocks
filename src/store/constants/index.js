import fromPairs from 'lodash/fromPairs'

function createActionTypes(base, requestTypes) {
  return fromPairs(
    requestTypes.map(
      requestType => [ requestType, `${ base }.${ requestType }` ]
    )
  )
}

const GAME = createActionTypes('GAME', [ 'TICK', 'DRAW', 'START', 'PAUSE', 'RESUME', 'RESET', 'OVER' ])
const BOARD = createActionTypes('BOARD', [ 'CLEAR' ])
const INPUT = createActionTypes('INPUT', [ 'UP', 'SPACEBAR', 'LEFT', 'RIGHT', 'DOWN', 'R' ])
const BLOCK = createActionTypes('BLOCK', [ 'UPDATE', 'CREATE', 'FREEZE' ])
const SCORE = createActionTypes('SCORE', ['ADD'])

const KEY_CODE_ACTION_TYPE = {
  '38': INPUT.UP,
  '32': INPUT.SPACEBAR,
  '37': INPUT.LEFT,
  '39': INPUT.RIGHT,
  '40': INPUT.DOWN,
  '82': INPUT.R
}

export { INPUT, GAME, BLOCK, BOARD, KEY_CODE_ACTION_TYPE, SCORE }
