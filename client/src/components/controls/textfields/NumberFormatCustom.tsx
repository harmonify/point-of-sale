import React from "react"
import { NumberFormatBase } from "react-number-format"
import PropTypes from "prop-types"

function NumberFormatCustom(props) {
  const { inputRef, onChange, name, ...other } = props

  return (
    <NumberFormatBase
      {...other}
      ref={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
            name,
          },
        })
      }}
      thousandSeparator
      prefix=""
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NumberFormatCustom