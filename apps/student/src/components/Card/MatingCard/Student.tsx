import StudentForm from '@component/Form/Student';
import type { ComponentProps } from 'react';

type StudentCardProps = Pick<
  ComponentProps<typeof StudentForm>,
  'control' | 'handleSubmit'
>;

export default function StudentCard({
  control,
  handleSubmit,
}: StudentCardProps) {
  return <StudentForm control={control} handleSubmit={handleSubmit} />;
}
