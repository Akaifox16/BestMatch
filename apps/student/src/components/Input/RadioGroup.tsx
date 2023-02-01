import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type CustomRadioGroupProps = {
  label: string;
  values: Array<string>;
};
const CustomRadioGroup = ({ label, values }: CustomRadioGroupProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row name={`${label}-radio-group`}>
        {values.map((val) => {
          return (
            <FormControlLabel label={val} value={val} control={<Radio />} />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
