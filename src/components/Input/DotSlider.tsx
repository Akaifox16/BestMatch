import { Slider, Typography } from "@mui/material"

type DotSliderProps = {
  fieldName: string
  defaultValue: number
  step: number
  min: number
  max: number
  getValueText?: (val: number) => string
}

function defaultGetValueText(val: number): string {
  return `value: ${val}`
}

const DotSlider = ({ fieldName, defaultValue, step, min, max, getValueText }: DotSliderProps) => {
  return (
    <div>
      <Typography variant='body1'>{fieldName}</Typography>
      <Slider
        aria-label={fieldName}
        getAriaValueText={getValueText || defaultGetValueText}
        valueLabelDisplay='auto'
        defaultValue={defaultValue}
        step={step}
        min={min}
        max={max}
        marks
      />
    </div>
  )
}

export default DotSlider