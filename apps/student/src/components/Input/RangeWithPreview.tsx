import type { FieldValues, SliderElementProps } from 'react-hook-form-mui';
import { SliderElement } from 'react-hook-form-mui';

// TODO: remap color when disable
export default function RangeWithPreview<Control extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: Pick<
  SliderElementProps<Control>,
  'name' | 'label' | 'control' | 'disabled'
>) {
  return (
    <SliderElement
      control={control}
      name={name}
      label={label}
      max={9}
      min={1}
      disabled={disabled}
      marks
      required={disabled ? false : true}
    />
  );
}
