import { TextField } from "@mui/material"

type FieldInputProps = {
  label: string
  val?: string
  err?: boolean
  errText?: string
  disable?: boolean
  password?: boolean
}

const FieldInput = ({ val, err, errText, disable, password, label }: FieldInputProps) => {
  return (
    <TextField
      label={label}

      value={val}
      error={err}
      helperText={errText}
      disabled={disable}
      required
      fullWidth

      margin='dense'
      variant='outlined'
      type={password ? 'password': 'text'}
    />
  )
}

export default FieldInput