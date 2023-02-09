import type { FieldValues, MultiSelectElementProps } from 'react-hook-form-mui';
import { MultiSelectElement } from 'react-hook-form-mui';

export default function MultiChoices<T, C extends FieldValues>({
  name,
  label,
  control,
  options,
}: Pick<MultiSelectElementProps<C>, 'name' | 'label' | 'control'> & {
  options: Array<T>;
}) {
  return (
    <MultiSelectElement
      name={name}
      label={label}
      control={control}
      options={options}
      showChips
      required
    />
  );
}
