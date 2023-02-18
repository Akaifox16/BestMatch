import { ComponentProps } from 'react';
import { FieldValues } from 'react-hook-form';
import MultiChoices from './MultiChoices';

type MultiChoicesProps<TFieldValues extends FieldValues> = ComponentProps<
  typeof MultiChoices<TFieldValues>
>;
type TimeRangeChoicesProps<TFieldValues extends FieldValues> = Pick<
  MultiChoicesProps<TFieldValues>,
  'control' | 'name' | 'disabled'
>;

const BEGIN_DAY = 0 as const;
const END_DAY = 23 as const;

const timeOptions = Array.from(Array(END_DAY - BEGIN_DAY + 1).keys()).map(
  (start) => {
    return { id: `${start}`, label: `${start}:00 - ${start + 1}:00` };
  }
) satisfies MultiChoicesProps<FieldValues>['options'];

export default function TimeRangeChoices<TFieldValues extends FieldValues>({
  name,
  control,
  disabled,
}: TimeRangeChoicesProps<TFieldValues>) {
  return (
    <MultiChoices
      control={control}
      name={name}
      label={'do not disturb'}
      options={timeOptions}
      disabled={disabled}
    />
  );
}
