import { createContext, useContext, useEffect, useRef } from 'react'
import { interpret, InterpreterFrom } from 'xstate'

import { ParentNode } from 'utils/type'
import userMachine from './machine'

const UserMachineCtx = createContext({
	authService: {} as InterpreterFrom<typeof userMachine>,
})

export default function UserMachineProvider({
	children,
}: ParentNode) {
	const user = useRef(
		interpret(userMachine)
			.onSend(console.log)
			.onTransition((state) => console.log(state.value))
	)

	useEffect(() => {
		user.current.start()
	}, [])

	return (
		<UserMachineCtx.Provider
			value={{ authService: user.current }}
		>
			{children}
		</UserMachineCtx.Provider>
	)
}

export const useUserMachine = () => useContext(UserMachineCtx)
