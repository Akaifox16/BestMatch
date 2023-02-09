import { Grid, Slider, Typography } from '@mui/material';

export type DotSliderProps = {
  fieldName: string;
  defaultValue: number;
  step: number;
  min: number;
  max: number;
  getValueText?: (val: number) => string;
};

function defaultGetValueText(val: number): string {
  return `value: ${val}`;
}

const DotSlider = ({
  fieldName,
  defaultValue,
  step,
  min,
  max,
  getValueText,
}: DotSliderProps) => {
  return (
    <Grid container>
      <Grid item xs={12} md={2} sx={{ mr: 4 }}>
        <Typography variant='body1'>{fieldName}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
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
      </Grid>
    </Grid>
  );
};

export default DotSlider;
