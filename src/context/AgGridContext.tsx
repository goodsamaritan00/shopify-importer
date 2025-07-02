import { createContext, useEffect, useReducer } from "react";
import type { IUser } from "../interfaces/IUser";

interface IAuthContextProvider {
  children: React.ReactNode;
}
type StateType = {
  user: IUser | null;
};

type ActionType = { type: "LOGIN"; payload: IUser } | { type: "LOGOUT" };

export const AuthContext = createContext<{
  user: IUser | null;
  dispatch: React.Dispatch<ActionType>;
} | null>(null);

export const authReducer = (
  state: StateType,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const storedUser = localStorage.getItem("User");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: initialUser,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      const user: IUser = JSON.parse(storedUser);
      // you can await something async here if needed
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
