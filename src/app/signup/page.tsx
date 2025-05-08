import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-secondary/10 p-8 rounded-lg shadow-lg max-w-md w-full backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 glitch glitch-text" data-text="Sign Up">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-background/50 border border-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-background/50 border border-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-background/50 border border-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Create a password"
            />
          </div>
          <Button className="w-full" variant="secondary">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}