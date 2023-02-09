import type { FieldValues, RadioButtonGroupProps } from 'react-hook-form-mui';
import { RadioButtonGroup } from 'react-hook-form-mui';

export default function RadioGroup<T, C extends FieldValues>({
  control,
  name,
  label,
  options,
}: Pick<RadioButtonGroupProps<C>, 'name' | 'label' | 'control'> & {
  options: Array<T>;
}) {
  return (
    <RadioButtonGroup
      control={control}
      name={name}
      label={label}
      options={options}
      row
      required
    />
  );
}
