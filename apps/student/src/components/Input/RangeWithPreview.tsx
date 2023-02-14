import {
  FieldValues,
  SliderElement,
  SliderElementProps,
} from 'react-hook-form-mui';

export default function RangeWithPreview<Control extends FieldValues>({
  control,
  name,
  label,
}: Pick<SliderElementProps<Control>, 'name' | 'label' | 'control'>) {
  return (
    <SliderElement
      control={control}
      name={name}
      label={label}
      max={9}
      min={1}
      marks
      required
    />
  );
}
