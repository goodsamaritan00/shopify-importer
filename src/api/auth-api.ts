import type { ActionType } from "../context/AuthContext";

const BASE_URL: string = "http://localhost:5000";

export interface IAuthProps {
  email: string;
  password: string;
  dispatch: React.Dispatch<ActionType>;
}

/*
- Creates new account via backend API and generates new JWT token for the user.
- User is stored in MongoDB and token is stored in local storage (for now) 
*/

export const userSignup = async (
  email: string,
  password: string,
  dispatch: React.Dispatch<any>,
) => {
  try {
    const res = await fetch(`${BASE_URL}/routes/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    if (res.ok) {
      localStorage.setItem("User", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    }
  } catch (error) {
    if (error instanceof Error) throw error;
  }
};

/* Finds existing user in the db and adds JWT token to the local storage */

export const userLogin = async (
  email: string,
  password: string,
  dispatch: React.Dispatch<any>,
) => {
  try {
    const res = await fetch(`${BASE_URL}/routes/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    if (res.ok) {
      localStorage.setItem("User", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    }
  } catch (error) {
    if (error instanceof Error) throw error;
  }
};
