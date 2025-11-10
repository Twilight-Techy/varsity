import Link from "next/link"
import SignUpForm from "@/components/auth/signup-form"
import SocialAuth from "@/components/auth/social-auth"
import { Separator } from "@/components/ui/separator"

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-foreground/60">Join Varsity to connect with your university community</p>
      </div>

      <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-6 shadow-lg">
        <SignUpForm />

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground/60">Or continue with</span>
            </div>
          </div>

          <SocialAuth />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-foreground/60">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
