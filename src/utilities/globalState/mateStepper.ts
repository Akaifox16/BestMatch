import { createMachine } from 'xstate'

const mateStepperMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFd8BrfAewHd8BiAbQAYBdRUABxtlwAuuGvi4gAHogC0AZgAsARhIA2BTLXLWCgKwB2AEwAOQ8oA0IAJ7S1ukqwCc9mfpm7l93ce2GAvj-NoWHiEpBTU9EzMCpxIILz8QiJikgiyMoYkenKsyrrq9nL6+h7mVqlytm6ehkYKhgqsuvbafgEYOATEJNwATjQAZrgANmCMAHIAogAaACpsMTx8gsKisSlNJHLeCvb6TVv2hnml0vqsrJl1chV7e7rZcq0ggR0hJAIUYCQw+AAKfYMRowAOITSYAJQAgjMJgAReZieLLJJrayHEj6BQVLaGRqePKGE4IIoZZx5BTKa6sbTKbTaR7+Z7tYJdD6EEiwbD0f4DYajSEAYQFE1+MPhHERS0Sq1AKSkmIyjm0Stxunx6SJMhpJBq5Mp2RpdIZbSCnVIbK+nO5AL5jHBEwAYgBVADKcIRsSR0uSiEMMhIMmcCmKOyKwdpRIUugumka2hkBWptL0TxeLNIGAEYH+YH642mcwlnqlKx9xOKm22u32yqO+iJ8vOl0M1wMbfurGNTNNb0z2Z6ucYACFBQBpD2LBKl1GpXRKNzUvRnelaIwNv12K43dsPVPMs0kPo0VA5vOTWYTuIllGyxDqfQB5ruPYFWv3BvKZSblvbu67xlpgeR4ngOeYjgK45FpOyIyhIiBqiorjGKwxQHEcMjrv6Wg-m2f6dn4jK0BAcBiIBISSlON5wak6T2CoagaFoS7GGYljSOoSisOo5xyIY3jKo4XZkV0YS0AwFEwWWshnCo2iYvYPHaDkaraA2RT+vGDj2M+MidhSQn7m8vS8iMEnejOUgbuceyttS2TBoSbGpFiX76MoOG3Gq-4mq8rKfGZ063jRWg6uc7mBniRxyJqD5krU7m8X6rh7j2fnsj8PKAmAAVUXK+jxqFORJZF75OQoOw6ns6j6kmRopb55qfByXJ0JlfI5bBco7HIJDleoxVquhjllEYX5ktVVKGvS9XpiQfanh1Zafo+NLVq+hzHE5UhYtozatp5HYGalpDAQtxaUZ1iCYpU5zpCh611g2LkYglv5efhBFAA */
	createMachine({
    id: 'mate_app_machine',
		initial: 'unknown',
		context: {
			initial: true,
		},
		states: {
			unknown: {
				always: [
					{ target: 'profile', cond: 'isInitialized' },
					{ target: 'tune' },
				],
			},

			profile: {
				on: {
					NEXT: 'matePref',
				},
			},

			tune: {
        initial: 'showProfile',
        states: {
          genProfile: {
              on: {
                  GENERATED: "showProfile"
              },

              entry: "generate_new_profile"
          },
          showProfile: {
              on: {
                  ACCEPTED: {
                      target: "genProfile",
                      actions: "accepted_feedback"
                  },

                  REFUSED: {
                      target: "genProfile",
                      actions: "refused_feedback"
                  }
              }
          },
        }
      },

			matePref: {
				on: {
					NEXT: 'roomPref',
					BACK: 'profile',
				},
			},

			roomPref: {
				on: {
					NEXT: 'tune',
					BACK: 'matePref',
				},
			},
		},
	})

export default mateStepperMachine
