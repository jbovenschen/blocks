function getInitialPosition(board, blocks) {
  const filledX = blocks.map(row => row.lastIndexOf(1) + 1)
  const maxX = Math.max(...filledX)

  return {
    y: 0,
    x: ((board[0].length / 2) - Math.ceil(maxX / 2))
  }
}

function isEmptyPosition(board, blocks, position) {
  const startX = position.x
  const startY = position.y

  const collapse = blocks.find(
    (horizontalRow, y) =>
      horizontalRow.find((block, x) => {
        if (block === 0) {
          return false
        }

        if (board[startY + y] && board[startY + y][startX + x]) {
          const tile = board[startY + y][startX + x]

          return (tile.color !== 'transparent' && tile.moving !== true)
        }

        return true
      }
    )
  )

  return collapse === undefined
}

const getFilledStrokes = (board) => board.map(
  (stroke, y) => stroke.every(tile => (tile.color !== 'transparent')) ? y : null
).filter(index => index !== null)


export { getInitialPosition, isEmptyPosition, getFilledStrokes }
