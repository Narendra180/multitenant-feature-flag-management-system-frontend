import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <div className="h-screen flex justify-center items-center p-5">
      <Card className="w-full max-w-125 flex flex-col gap-6">
        <CardHeader>
          <CardTitle>
            <h1 className="text-center text-2xl font-medium">
              Signup
            </h1>
          </CardTitle>
          <CardDescription>
            <p className="text-center">
              Enter your email, password below to signup
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupPage;
