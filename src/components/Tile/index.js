import React from 'react'

import config from '../../../config'
import styles from './style.css'

const Tile = ({ x, y, color }) => (
  <div
    className={ styles.tile }
    style={ {
      color,
      width: config.tile.width,
      height: config.tile.height,
      left: x * config.tile.width,
      top: y * config.tile.height
    } }
  />
)

export default Tile
