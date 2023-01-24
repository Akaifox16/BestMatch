import Head from 'next/head'
import Link from 'next/link'

import { Button, Container, Grid, Typography } from '@mui/material'

import { TimelineWithDate } from '@component/SystemTimeline'
import CustomHeader from '@component/CustomHeader'
import { useSelector } from '@xstate/react'
import { loggedInSelector, useUserMachine } from '@component/Context/Auth'

const evtNames = ['ลงทะเบียนผู้ใช้', 'เปิดระบบจับคู่', 'ปิดระบบจับคู่', 'ระบบประมวลผล', 'ประกาศผล']
const dates: { year: number; month: number; day: number }[] = [
	{ year: 2022, month: 1, day: 12 },
	{ year: 2022, month: 1, day: 16 },
	{ year: 2022, month: 5, day: 16 },
	{ year: 2022, month: 5, day: 17 },
	{ year: 2022, month: 5, day: 28 },
]
const timeline = evtNames.map((evt, idx) => ({
	evtName: evt,
	date: new Date(
		dates.at(idx)!.year,
		dates.at(idx)!.month,
		dates.at(idx)!.day
	),
}))

export default function Home() {
	const userMachine = useUserMachine()
	const isLoggedIn = useSelector(userMachine.authService, loggedInSelector)

	return (
		<div>
			<CustomHeader pageName='home' />

			<main>
				<Typography align='center' variant='h2' sx={{ mt: 8 }}>
					ยินดีต้อนรับสู่ BestMatch!
				</Typography>

				<Grid container spacing={2} sx={{ mt: 4 }}>
					<Grid item xs={4}></Grid>
					<Grid
						item
						xs={4}
						sx={{ justifyContent: 'center', display: 'flex' }}
					>
						<Link href={isLoggedIn ? '/matching': '/login'}>
							<Button variant='contained' sx={{ mr: 1 }}>
								เริ่มเลย!
							</Button>
						</Link>
						<Link href='/tutorials'>
							<Button
								variant='outlined'
								color='secondary'
								sx={{ ml: 1 }}
							>
								คู่มือการใช้
							</Button>
						</Link>
					</Grid>
					<Grid item xs={4}></Grid>
				</Grid>

				<Container sx={{ mt: 8 }}>
					<Typography variant='body1' gutterBottom align='center'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ratione repellat, quos, itaque aut laboriosam iusto et
						repellendus assumenda odio doloremque quidem unde, dolor
						dolorum a aspernatur porro. Deserunt ducimus natus, omnis
						in dignissimos labore beatae cum accusamus fugiat dolores,
						fugit optio veniam ex quas exercitationem similique! Id
						libero rem aperiam nesciunt distinctio quia laudantium
						commodi odit numquam magnam fugiat esse modi cupiditate
						suscipit accusantium ab, tenetur temporibus soluta,
						eveniet sunt? Eaque, iusto repellat maiores mollitia sequi
						nostrum maxime quas voluptatem voluptates! Placeat, cumque
						numquam! Beatae, error, quos blanditiis voluptatibus odio
						doloribus aspernatur vel reiciendis sunt rerum aperiam
						cupiditate suscipit eum?
					</Typography>
				</Container>

				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12} md={4}>
						<TimelineWithDate timeline={timeline} />
					</Grid>
					<Grid
						item
						xs={6}
						md={8}
						sx={{ backgroundColor: 'green' }}
					></Grid>
				</Grid>
			</main>
		</div>
	)
}
