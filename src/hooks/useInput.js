import { useState } from 'react'

const noReturnFromValidatorFnMessage =
  'Must return a Boolean or Array[Boolean, message] inside the validator function'
const parseParams = params => {
  params = params.reverse()
  const validatorFn = params[0] || (() => true)
  const defaultValue = params[1] || ''
  return [validatorFn, defaultValue]
}

export default function (...params) {
  const [validatorFn, defaultValue] = parseParams(params)

  const [value, setValue] = useState(defaultValue)
  const [isTouched, setIsTouched] = useState(false)

  const valid = validatorFn(value)
  if (valid == undefined) throw new Error(noReturnFromValidatorFnMessage)
  const isValid = valid[0] ?? valid

  const error = isTouched && !isValid
  const hasError = error && (valid[1] || true)

  const handler = {
    blur() {
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
