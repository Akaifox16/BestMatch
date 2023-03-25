import { ChoicerCard } from '@component/Card';
import { useMatingContext } from '@component/Context/MateApp';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useForm } from 'react-hook-form';

export default function Finetune() {
  const {
    state: {
      context: {
        profileA: { attribute: attrA, ...profileA },
        profileB: { attribute: attrB, ...profileB },
      },
    },
    send,
  } = useMatingContext();

  console.log(profileA);
  const { control: profileAControl } = useForm({
    defaultValues: profileA,
  });
  const { control: profileBControl } = useForm({
    defaultValues: profileB,
  });

  return (
    <div>
      <div>this is fine tuner</div>
      {/* <div>{JSON.stringify(state.context)}</div> */}
      <Stack direction='column' sx={{mt: 2, width: '100%'}}>
        <ChoicerCard
          control={profileAControl}
          handlePick={() =>
            send({
              type: 'PICKED',
              data: {
                profilePick: { ...profileA, attribute: attrA },
                profileComp: { ...profileB, attribute: attrB },
              },
            })
          }
        />
        <Typography>VS</Typography>
        <ChoicerCard
          control={profileBControl}
          handlePick={() =>
            send({
              type: 'PICKED',
              data: {
                profilePick: { ...profileB, attribute: attrB },
                profileComp: { ...profileA, attribute: attrA },
              },
            })
          }
        />
      </Stack>
    </div>
  );
}
