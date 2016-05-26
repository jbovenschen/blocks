import { KEY_CODE_ACTION_TYPE } from '../constants'

// Helper to return promises from browser event handlers
// I geuss this can be replaced with a much cleaner method
// but it works for now
const input = (() => {
  const createPromise = () => (new Promise(resolve => {
    const onInput = e => {
      if (Object.keys(KEY_CODE_ACTION_TYPE).indexOf(String(e.keyCode)) !== -1) {
        e.preventDefault()

        resolve(KEY_CODE_ACTION_TYPE[String(e.keyCode)])

        promise = createPromise()

        document.removeEventListener('keydown', onInput)
      }
    }
    document.addEventListener('keydown', onInput)
  }))

  let promise = createPromise()

  return () => promise
})()

export { input }
