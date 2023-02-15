import {
  FieldValues,
  TextFieldElement,
  TextFieldElementProps,
} from 'react-hook-form-mui';

export default function TextInput<Control extends FieldValues>({
  name,
  label,
  control,
}: Pick<TextFieldElementProps<Control>, 'name' | 'label' | 'control'>) {
  return (
    <TextFieldElement name={name} label={label} control={control} fullWidth />
  );
}
