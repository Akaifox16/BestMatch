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
  disabled,
}: Pick<
  MultiSelectElementProps<Control>,
  'name' | 'label' | 'options' | 'control' | 'disabled'
>) {
  return (
    <MultiSelectElement
      control={control}
      name={name}
      label={label}
      options={options}
      disabled={disabled}
      required={disabled ? false : true}
      showChips
    />
  );
}
