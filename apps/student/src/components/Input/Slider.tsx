import type { FieldValues, SliderElementProps } from 'react-hook-form-mui';
import { SliderElement } from 'react-hook-form-mui';

export default function SliderWithLabel<C extends FieldValues>({
  name,
  label,
  control,
}: Pick<SliderElementProps<C>, 'name' | 'label' | 'control'>) {
  return (
    <SliderElement
      name={name}
      label={label}
      control={control}
      min={1}
      max={9}
      marks
    />
  );
}
