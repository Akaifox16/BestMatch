import type { FieldValues, RadioButtonGroupProps } from 'react-hook-form-mui';
import { RadioButtonGroup } from 'react-hook-form-mui';

export default function RadioGroup<Control extends FieldValues>({
  name,
  label,
  control,
  options,
}: Pick<
  RadioButtonGroupProps<Control>,
  'name' | 'label' | 'control' | 'options'
>) {
  return (
    <RadioButtonGroup
      name={name}
      label={label}
      control={control}
      options={options}
      required
    />
  );
}
