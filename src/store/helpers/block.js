import { PIECES } from '../constants/pieces'

function getRandomBlock(obj = PIECES) {
  const keys = Object.keys(obj)
  return obj[keys[ keys.length * Math.random() << 0]];
}

const getRandomRotation = () =>
  Math.floor(Math.random() * 4)

const getNextRotation = (currentRotation) =>
  currentRotation === 3 ? 0 : currentRotation + 1

export { getRandomBlock, getRandomRotation, getNextRotation }
