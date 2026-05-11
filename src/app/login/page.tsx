import { headers } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
  const headerList = await headers();
  const host = headerList.get("host") || "";
  const isRootSubdomain = host.includes("root");

  return (
    <div className="h-screen flex justify-center items-center p-5">
      <Card className="w-full max-w-125 flex flex-col gap-6">
        <CardHeader>
          <CardTitle>
            <h1 className="text-center text-2xl font-medium">
              Login
            </h1>
          </CardTitle>
          <CardDescription>
            <p className="text-center">
              Enter your email, password below to login to your account
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm isRootSubdomain={isRootSubdomain} />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;
