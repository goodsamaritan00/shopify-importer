import { useMutation } from "@tanstack/react-query";
import { userLogin, userSignup, type IAuthProps } from "../api/auth-api";
import { notifyError, notifySuccess } from "../utils/toast-messages";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const {
    data: signupUser,
    isPending: isSigningUser,
    isError: isSignupError,
    error: signupError,
    isSuccess: isSignupSuccess,
    mutate: handleUserSignup,
  } = useMutation({
    mutationFn: ({ email, password, dispatch }: IAuthProps) =>
      userSignup(email, password, dispatch),
    onSuccess: () => {
      notifySuccess("User Signed in");
      navigate("/product-table");
    },
    onError: (error) => {
      console.log(error);
      notifyError(error.message);
    },
  });

  return {
    signupUser,
    isSigningUser,
    isSignupError,
    signupError,
    isSignupSuccess,
    handleUserSignup,
  };
}

export function useLogin() {
  const navigate = useNavigate();

  const {
    data: loginUser,
    isPending: isLoggingUser,
    isError: isLoginError,
    error: loginError,
    isSuccess: isLoginSuccess,
    mutate: handleUserLogin,
  } = useMutation({
    mutationFn: ({ email, password, dispatch }: IAuthProps) =>
      userLogin(email, password, dispatch),
    onSuccess: () => {
      notifySuccess("User logged in");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      notifyError(error.message);
    },
  });

  return {
    loginUser,
    isLoggingUser,
    isLoginError,
    loginError,
    isLoginSuccess,
    handleUserLogin,
  };
}

export function useLogout() {
  const navigate = useNavigate();

  const logout = (dispatch: React.Dispatch<any>) => {
    localStorage.removeItem("User");
    dispatch({ type: "LOGOUT" });
    notifySuccess("User successfuly logged out!");
    navigate("/auth");
  };

  return {
    logout,
  };
}
