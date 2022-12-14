
import { createContext, useContext, useEffect, useRef } from "react";
import { ParentNode } from "@utility/type";
import { interpret, InterpreterFrom, State, StateFrom } from "xstate";
import userMachine from "@utility/globalState/user";
const UserMachineContext = createContext({authService: {} as InterpreterFrom<typeof userMachine>})

export const UserMachineProvider = ({ children }: ParentNode) => {
  const user = useRef(interpret(userMachine)
  .onSend(console.log)
  .onTransition(state => console.log(state.value)))

  useEffect(() => {
    user.current.start()
  }, [])

  return (
    <UserMachineContext.Provider value={{authService: user.current}}>
      {children}
    </UserMachineContext.Provider>
  )
}

export const loggedInSelector = (state: StateFrom<typeof userMachine>) => state.matches('authenticated')

export const useUserMachine = () => useContext(UserMachineContext)