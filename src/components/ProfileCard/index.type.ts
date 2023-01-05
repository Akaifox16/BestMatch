export type ProfileVariant = 'profile' | 'matePref' | 'roomPref' | 'summary' | 'tuner'
export type StudentVariant = Extract<ProfileVariant, 'profile' | 'matePref'>
export type MatchVariant = Exclude<ProfileVariant, 'summary'>

export type ProfileCardProps = {
	variant: ProfileVariant
}

export type ProfileOwner = 'self' | 'mate'
export type AttrName = {
	messiness: string
	noise: string
	time: string
}