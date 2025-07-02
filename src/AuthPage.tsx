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

import ThreePlogo from "./assets/3plogo.png";
import ShopifyLogo from "./assets/shopify-logo.png";
import AswoLogo from "./assets/aswo-logo.png";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const { handleUserLogin } = useLogin();

  const { dispatch } = useAuthContext();

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-screen bg-blue-400">
      <h2 className="text-4xl font-[200] text-white">
        <span className="font-[600]">Shopify</span>
        Importer
      </h2>
      {/* login */}
      <Card className="w-full max-w-sm mb-22 mt-2">
        <CardHeader>
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription className="mt-2">
            Enter your email and password below to login to your account
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Request new password
                  </a>
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
          >
            Login
          </Button>
        </CardFooter>
        <Button variant="ghost" size="sm">
          Request Account
        </Button>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[50px] w-[100px] flex items-center justify-center">
            <img
              className="h-full object-contain"
              src={ShopifyLogo}
              alt="Shopify"
            />
          </div>
          <div className="h-[40px] w-[100px] flex items-center justify-center">
            <img
              className="h-full object-contain"
              src={ThreePlogo}
              alt="ThreeP"
            />
          </div>
          <div className="h-[20px] w-[100px] flex items-center justify-center">
            <img className="h-full object-contain" src={AswoLogo} alt="Aswo" />
          </div>
        </div>
      </Card>
    </div>
  );
}
