import { Slider, Typography } from "@mui/material"
import { useState } from "react"
import { DotSliderProps } from "./DotSlider"

type RangeSliderProps = Omit<DotSliderProps, 'defaultValue'|'getValueText'|'step'> &
{
  
  getValueText?: (val: number, idx: number) => string
}

function defaultGetValueText(val: number, _idx: number): string {
  return `time: ${val}`
}

const MIN_DISTANCE = 1 as const

const RangeSlider = ({ fieldName, min, max, getValueText }: RangeSliderProps) => {
  const [val, setValue] = useState([min, max])
  
  const handleChange = (_evt: Event, newVal: number | number[], activeThumb: number) => {
    if(!Array.isArray(newVal)) return

    if(activeThumb === 0 ) 
      setValue([ Math.min(newVal[0], newVal[1] - MIN_DISTANCE), newVal[1] ])
    else
      setValue([ newVal[0], Math.max(newVal[0] + MIN_DISTANCE, newVal[1]) ])
  }

  return (
    <div>
      <Typography variant='body1'>{fieldName}</Typography>
      <Slider
        aria-label={fieldName}
        value={val}
        onChange={handleChange}
        getAriaValueText={getValueText || defaultGetValueText}
        valueLabelDisplay='auto'
        step={MIN_DISTANCE}
        min={min}
        max={max}
      />
    </div>
  )
}

export default RangeSlider