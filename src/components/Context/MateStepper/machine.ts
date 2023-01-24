import { createMachine } from 'xstate'

const mateStepperMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EARgBsAFmo916gEwAOAKzKA7NoOaAzABoQATwWbF1JYqfy72t3oC+Hy2kw58hKiklDT0TGycXPICSCDCouKS0nIISqoaWnqGxmaWNgiaurpqGXrapiamyopePhjYeATE5FTUuABOzABmZAA2YBwAcgCiABoAKrwxQiJiElKxKYryPNQGyybyAJza2wamFtaIyqYO2oqmmluKZrrb2oW1IL4NAc0h1C8ACu1gXUNjSb8aTxOZJRaIbQnNYGeS6JyKc6mLbbPLHU7yJHyeTKMzGapPF7+JpBFo0b6-f4AIQAggBhADSUxBs0SC1AKSqqjSPEqRXKV0UaIKPC2DgOBh4ylFJ3kpjchPqxMCwVanWYyB+fwBE2ZsVBbOSkJ2DgMuh4xgquL2wtMSjU6zubjueNMukVfkaKrJ1HVmspHFpjL1MwS8yNCBU2moyl0BzMmiMmO0W2Fmjs1ERcq2RVxWy26e0HteJNVNHQ9BoMAoP26fQGEEkNEoADdmAwq2AqO16rWev0Q3FWeGIQhpat8zwcU4pW69Id8tp1GtE8pjFstAXlMXle9WhXWtW+-WOGB2p12m1ehgusx2shqNWz73Ov2wIODSOOYgVKdJSZFB4ZF9iMYUbmKQwLV0dNZ35HcvT3ctK2oWASDYY9+g4ek6WGL5xmGAARD9h3Bb9IyA6hzSXKVqnKedhQMfNqHTM0lDuUwLTteC3lJD4DxoVD0NfE8ACVhgAMQAVQAZUI4iw1I2RIR4TRqDtWEDGUOEtgqVEjgQRixRYu5FHYzjNC8bwQBYCA4GkIkEN4qgWQU9klIQABaFxVOxGd1GUa4bm0YUPJ0aMdnWM0AuUE4DndKyHJ4ss6EYFh2BcsE3JSDzNIcRwNACpwdBCzQpxjYxFDNconXNUxuNLH0OjrfoMsNUd42oAtkyq619iFfSXFULSnF0fZChWed6u9D4KT+Vqv3c8DqDcUUcQ4pxpX6-JBpjRw13TaCyiLBKlUc5K-S1Lp5sUlIHlUaDsShCorjXYUduGxFqk0WN1lxKbEOofjrqyxA3VUydp0Ak5dHo-TzWKc0eAuKCRqXGoTs9JKfX4x8uwwsBgYjWNo0TO1IJnQwc2FXQdJKJH5CMFFAOxf6nKQ1pBNYfHCdHIK1I3KE7CKeFRuFLZqkonZeSKC54QuSyPCAA */
	createMachine(
		{
			id: 'mate_app_machine',
			initial: 'unknown',
			context: {
				initial: true,
				profile: undefined,
			},
			states: {
				unknown: {
					always: [
						{ target: 'profile', cond: 'isInit' },
						{ target: 'tuner' },
					],
				},
				profile: {
					on: {
						NEXT: 'matePref',
					},
				},
				matePref: {
					on: {
						NEXT: 'roomPref',
						BACK: 'profile',
					},
				},

				roomPref: {
					on: {
						NEXT: {
							target: 'tuner',
							actions: 'initialized',
						},
						BACK: 'matePref',
					},
				},
				tuner: {
					initial: 'genProfile',
					states: {
						genProfile: {
							// invoke: {
							//   id: 'generateProfile',
							//   src: () => undefined,
							//   onDone: {
							//     target: 'showProfile',
							//     actions: assign({profile: (_ctx, evt) => evt.data})
							//   },
							//   onError: {
							//     target: 'genProfile',
							//   }
							// }
						},
						showProfile: {
							on: {
								ACCEPTED: {
									target: 'genProfile',
									actions: 'accepted_feedback',
								},

								REFUSED: {
									target: 'genProfile',
									actions: 'refused_feedback',
								},
							},
						},
					},
				},
			},
		},
		{
			guards: {
				isInit: ({ initial }) => {
					return initial
				},
			},
			actions: {
				initialized: ({ initial }) => {
					initial = true
				},
			},
		}
	)

export default mateStepperMachine