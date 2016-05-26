import React from 'react'
import { connect } from 'react-redux'

import Status from './components/Status'
import Screen from './components/Screen'
import Tile from './components/Tile'
import Score from './components/Score'

const mapStateToProps = ({ board, status }) => ({
  board,
  status
})

const enhance = connect(
  mapStateToProps
)

const App = enhance(({ board, status }) => (
  <Screen>
    { board.map((vertTiles, y) => vertTiles.map(({ color }, x) => (
      <Tile
        key={ `${x}.${y}` }
        x={ x }
        y={ y }
        color={ color }
      />
    ) ) ) }
    <Score score={ status.score } />
    <Status
      started={ status.started }
      running={ status.running }
      lost={ status.lost }
    />
  </Screen>
))

export default App
