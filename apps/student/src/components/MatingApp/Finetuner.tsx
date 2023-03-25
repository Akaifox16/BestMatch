import { ChoicerCard } from '@component/Card';
import { useMatingContext } from '@component/Context/MateApp';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function Finetune() {
  const { isLoading } = useMatingContext();
  const {
    state: {
      context: {
        profileA: { attribute: attrA, ...profileA },
        profileB: { attribute: attrB, ...profileB },
      },
    },
    send,
  } = useMatingContext();

  if (isLoading) {
    return <div>Generating new Profiles</div>;
  }

  return (
    <div>
      <div>this is fine tuner</div>
      <Stack direction='column' sx={{ mt: 2, width: '100%' }}>
        <div>{JSON.stringify(profileA)}</div>
        <ChoicerCard
          profile={profileA}
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
        <div>{JSON.stringify(profileB)}</div>
        <ChoicerCard
          profile={profileB}
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
