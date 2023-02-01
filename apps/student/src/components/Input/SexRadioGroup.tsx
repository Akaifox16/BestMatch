import {
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material'

export type Sex = 'ชาย' | 'หญิง'

type SexRadioProps = {
	val: Sex
}

const SexRadio = ({ val }: SexRadioProps) => {
	return (
		<FormControlLabel value={val} control={<Radio />} label={val} />
	)
}

const SexRadioGroup = ({ val }: SexRadioProps) => {
	return (
		<FormControl required>
			<FormLabel>เพศสภาพ</FormLabel>
			<RadioGroup defaultValue={val} name='sex-radio-group' row>
				<SexRadio val='ชาย' />
				<SexRadio val='หญิง' />
			</RadioGroup>
		</FormControl>
	)
}

export default SexRadioGroup
