import { ChoicerCard } from '@component/Card';
import { useMatingContext } from '@component/Context/MateApp';

export default function Finetune() {
  const { state } = useMatingContext();
  return (
    <div>
      <div>this is fine tuner</div>
      <div>{JSON.stringify(state.value)}</div>

      <ChoicerCard />
    </div>
  );
}
