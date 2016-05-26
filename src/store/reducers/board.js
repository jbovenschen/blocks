import config from '../../../config'
import { GAME, BLOCK, BOARD } from '../constants'

const initialTile = {
  color: 'transparent',
  moving: false
}

// create the initial grid
const initialGrid = Array.apply(null, { length: config.grid.verticalSize }).map(
  () => Array.apply(null, { length: config.grid.horizontalSize }).map(() => initialTile)
)

const freezeGrid = (grid) =>
  grid.map((column, y) =>
    column.map((item, x) =>
      item.color !== 'transparent' ?
        Object.assign({}, item, { moving: false }) :
        initialTile
  ))

function updateGrid(grid, block) {
  const tile = block.piece.blocks[block.rotation]

  const filledX = tile.map(row => row.lastIndexOf(1))

  const startX = block.position.x
  const startY = block.position.y

  return grid.map((column, y) => (
    column.map((item, x) => {
      const gridTile = grid[y][x]

      if(tile[y - startY] && tile[y - startY][x - startX] === 1) {
        return {
          moving: true,
          color: block.piece.color
        }
      }

      if (!gridTile.moving) {
        return gridTile
      }

      return initialTile
    })
  ))
}

const clearStrokes = (grid, strokes) => {
  const reversedOrderedStrokes = strokes.sort((a, b) => b - a)

  reversedOrderedStrokes.forEach(y => grid.splice(y, 1))

  return Array.apply(null, { length: strokes.length }).map(
    () => Array.apply(null, { length: config.grid.horizontalSize }).map(() => initialTile)
  ).concat(grid)
}

function reducer(state = initialGrid, action) {
  switch (action.type) {
    case GAME.DRAW:
      return updateGrid(action.payload.board, action.payload.block)
    case BLOCK.FREEZE:
      return freezeGrid(state)
    case BOARD.CLEAR:
      return clearStrokes(state, action.payload)
    case GAME.RESET:
      return [].concat(initialGrid)
    default:
      return state
  }
}

export { reducer }
