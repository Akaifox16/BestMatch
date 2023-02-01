import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineContent,
  TimelineOppositeContent,
	TimelineDot,
	TimelineConnector,
} from '@mui/lab'

type TimelineWithDateProps = {
	timeline: {
		date: Date,
		evtName: string,
	}[]
}

const TimelineWithDate = ({ timeline }: TimelineWithDateProps) => {
	return (
		<Timeline>
			{timeline.map((item, idx) => {
				return (
					<TimelineItem key={`${item}-${idx}`}>
            <TimelineOppositeContent>{item.evtName}</TimelineOppositeContent>
						<TimelineSeparator>
							{idx === timeline.length-1 ? (
							  <TimelineDot />
							) : (
								<>
									<TimelineDot color='success'/>
									<TimelineConnector />
								</>
							)}
						</TimelineSeparator>
						<TimelineContent>{item.date.toDateString()}</TimelineContent>
					</TimelineItem>
				)
			})}
		</Timeline>
	)
}

type TimelineWithoutDateProps = {
	timeline: string[]
}

const TimelineWithoutDate = ({ timeline }: TimelineWithoutDateProps) => {
	return (
		<Timeline>
			{timeline.map((item, idx) => {
				return (
					<TimelineItem key={`${item}-${idx}`}>
						<TimelineSeparator>
							{idx === timeline.length-1 ? (
							  <TimelineDot />
							) : (
								<>
									<TimelineDot color='success'/>
									<TimelineConnector />
								</>
							)}
						</TimelineSeparator>
						<TimelineContent>{item}</TimelineContent>
					</TimelineItem>
				)
			})}
		</Timeline>
	)
}

export {
	TimelineWithDate,
	TimelineWithoutDate
}