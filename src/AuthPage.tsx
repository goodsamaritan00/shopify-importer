import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { useLogin } from "./hooks/useAuth";
import useAuthContext from "./hooks/useAuthContext";

import Loader from "./components/ui/loader";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const { handleUserLogin, isLoggingUser } = useLogin();

  const { dispatch } = useAuthContext();

  return (
    <div className="flex auth-background flex-col absolute w-screen h-screen top-0 z-50 items-center justify-center w-full h-screen ">
      {/* login */}
      <Card className="w-full max-w-[450px] mt-2 justify-around gap-8">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription className="mt-2 text-sm">
            Enter your email and password below to login to your Shopify
            Importer account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  className="border-neutral-300 rounded-sm focus:border-blue-400"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <label htmlFor="password">Password</label>
                </div>
                <Input
                  onChange={(e) => setLoginPassword(e.target.value)}
                  id="password"
                  type="password"
                  required
                  className="border-neutral-300 rounded-sm focus:border-blue-400"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={() => {
              handleUserLogin({
                email: loginEmail,
                password: loginPassword,
                dispatch,
              });
            }}
            type="submit"
            className="w-full"
            disabled={isLoggingUser}
          >
            {isLoggingUser ? <Loader color="#ffff" size={18} /> : "Log in"}
          </Button>
          <div className="text-sm mr-auto mt-8">
            <span>Forgot password?</span>
            <span className="ml-2 font-semibold text-blue-400">
              Request a new one.
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
