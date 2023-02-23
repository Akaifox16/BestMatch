import type { ComponentProps } from 'react';
import DormForm from '@component/Form/Dorm';

type DormCardProps = Pick<ComponentProps<typeof DormForm>, 'control'>;

export default function DormCard({ control }: DormCardProps) {
  return <DormForm control={control} />;
}
