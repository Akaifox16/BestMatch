import { ChoicerCard } from '@component/Card';
import { useMatingContext } from '@component/Context/MateApp';
import { Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function Finetune() {
  const { isLoading, generatorError, weights } = useMatingContext();
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
    return (
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        Generating new profiles...
      </Typography>
    );
  }
  if (generatorError) {
    return (
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        {' '}
        An Error occured during generate profiles
      </Typography>
    );
  }

  return (
    <Container>
      <Stack direction='column'>
        <Typography variant='h3'>{`your current weights: ${
          weights ? JSON.stringify(weights) : 'not found your weights'
        }`}</Typography>
        <Stack
          direction='row'
          spacing={2}
          sx={{ display: 'flex', alignItems: 'center', pt: 4 }}
        >
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
          <Typography variant='h4' sx={{ alignSelf: 'center', flexGrow: 1 }}>
            VS
          </Typography>
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
      </Stack>
    </Container>
  );
}
