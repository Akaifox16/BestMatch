import { Grid, Paper, Typography } from "@mui/material"
import { titleCase } from "utils/util"
import { Fragment, ReactNode } from "react"

type CardTemplateProps= {
  children: ReactNode 
} & CardTitleProps

const CardTemplate = ({ name, control, children }: CardTemplateProps) => {
  return <Paper elevation={1} sx={{ m: 8}}>
    <Grid container spacing={2} sx={{ my: 2, p:4 }}>
      <CardTitle name={name} control={control} />
      { children }
    </Grid>
  </Paper>
}

type CardTitleProps = {
  name: string
  control?: ReactNode
}

const CardTitle = ({ name, control }: CardTitleProps) => {
  return <Fragment>
    <Grid
      item
      xs={10}
      sx={{ justifyContent: 'left', display: 'flex' }}
    >
      <Typography variant='h3'>{titleCase(name)}</Typography>
    </Grid>
    <Grid
      item
      xs={2}
      sx={{ justifyContent: 'right', display: 'flex'}}
    >
      {control || <Fragment />}
    </Grid>
  </Fragment>
}

export default CardTemplate