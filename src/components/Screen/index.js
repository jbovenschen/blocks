import React from 'react'

import config from '../../../config'
import styles from './style.css'

const Screen = ({ children }) => (
  <div
    style={ {
      height: config.grid.verticalSize * config.tile.width,
      width: config.grid.horizontalSize * config.tile.height
    } }
    className={ styles.screen }
  >
    { children }
  </div>
)

export default Screen
