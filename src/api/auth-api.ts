import { type IUser } from "../interfaces/IUser";

const BASE_URL: string = "https://importer-be.onrender.com";

export interface IAuthProps {
  email: string;
  password: string;
  dispatch: React.Dispatch<IUser>;
}

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
