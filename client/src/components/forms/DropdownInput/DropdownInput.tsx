import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CustomTextField from "../../controls/textfields/CustomTextField"
import SelectWrapped from "./SelectWrapped"
import styles from "./styles"
import FormikTextInput from "@/components/forms/FormikTextInput"
import { TextFieldProps } from "@material-ui/core"
import { useField } from "formik"

const DropdownInput: React.FC<
  {
    children: React.ReactElement
    label: string
    id: string
    name: string
    datasource: any[]
    placeholder?: string
  } & TextFieldProps
> = (props) => {
  // @ts-ignore
  const [field, meta] = useField(props)

  return (
    <>
      <FormikTextInput
        {...field}
        {...props}
        fullWidth
        // value={this.state.selectedValue}
        // onChange={this.handleChange}
        name="react-select-chip-label"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputComponent: SelectWrapped,
          inputProps: {
            classes: props.classes,
            instanceId: "react-select-chip-label",
            id: "react-select-chip-label",
            simpleValue: true,
            options: props.datasource,
          },
        }}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

DropdownInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DropdownInput)
