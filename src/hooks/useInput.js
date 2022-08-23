import { useState } from 'react'

export default function (...params) {
  params = params.reverse()
  const validatorFn = params[0] || (() => true)
  const defaultValue = params[1] || ''

  const [value, setValue] = useState(defaultValue)
  const [isTouched, setIsTouched] = useState(false)

  const valid = validatorFn(value)
  const isValid = valid[0] ?? valid
  const error = isTouched && !isValid
  const hasError = error && (valid[1] || true)

  const handler = {
    blur(e) {
      setIsTouched(true)
    },
    change(e) {
      setValue(e.target.value)
    },
  }

  return [
    value,
    isValid,
    hasError,
    handler,
    {
      value: setValue,
      isTouched: setIsTouched,
      reset: () => {
        setIsTouched(false), setValue(defaultValue)
      },
    },
  ]
}
