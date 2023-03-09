import type { ComponentProps } from 'react';
import DormForm from '@component/Form/Dorm';

type DormCardProps = Pick<ComponentProps<typeof DormForm>, 'control'|'handleSubmit'>;

export default function DormCard({ control, handleSubmit}: DormCardProps) {
  return <DormForm control={control} handleSubmit={handleSubmit} />;
}
