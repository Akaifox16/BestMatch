import StudentForm from '@component/Form/Student';
import type { ComponentProps } from 'react';

type StudentCardProps = Pick<ComponentProps<typeof StudentForm>, 'control'>;

export default function StudentCard({ control }: StudentCardProps) {
  return <StudentForm control={control} />;
}
