import {
  FieldValues,
  MultiSelectElement,
  MultiSelectElementProps,
} from 'react-hook-form-mui';

export default function MultiChoices<Control extends FieldValues>({
  name,
  label,
  options,
  control,
}: Pick<
  MultiSelectElementProps<Control>,
  'name' | 'label' | 'options' | 'control'
>) {
  return (
    <MultiSelectElement
      control={control}
      name={name}
      label={label}
      options={options}
      required
      showChips
    />
  );
}
