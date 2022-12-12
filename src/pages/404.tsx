import { Typography } from "@mui/material"
import Link from "next/link"

const Four_O_Four = () => {
  return (
    <div>
      <Typography variant="h1">404 Not Found</Typography>
      <Typography variant="h3">Sorry no content you seek here.</Typography>
      <Link href='/' >Go back Home</Link>
    </div>
  )
}

export default Four_O_Four