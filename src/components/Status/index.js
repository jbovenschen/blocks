import React from 'react'

import styles from './style.css'

const Status = ({ running, started, lost }) => {
  if (lost) {
    return (
      <div className={ styles.overlay }>
        <div className={ styles.info }>Game over!!</div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className={ styles.overlay }>
        <div className={ styles.info }>Press space to start</div>
      </div>
    )
  }

  if (!running) {
    return (
      <div className={ styles.overlay }>
        <div className={ styles.info }>Paused</div>
      </div>
    )
  }

  return null
}

export default Status
