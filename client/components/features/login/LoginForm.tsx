import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  errorMessage?: string;
  loginAction: (formData: FormData) => void | Promise<void>;
}
export function LoginForm({ errorMessage, loginAction }: LoginFormProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900/70 p-10 sm:p-12">
        <h1 className="text-4xl font-bold text-yellow-400 text-center">
          Login
        </h1>
        <p className="mt-3 text-base text-slate-300 text-center">
          Sign in to access your account and orders.
        </p>

        {errorMessage && (
          <div className="mt-5 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-base text-red-200">
            {errorMessage}
          </div>
        )}

        <form action={loginAction} className="mt-7 space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className="text-base text-slate-200">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              className="h-11 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-base text-slate-200">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="h-11 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-base text-slate-200">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="h-11 text-base"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500 text-base h-11"
          >
            Sign in
          </Button>
        </form>
        <a
          href="/register"
          className="block text-center text-sm text-slate-400 hover:text-slate-200 mt-5"
        >
          <Button
            type="submit"
            className="w-full border-2 border-yellow-400 text-yellow-400 bg-transparent hover:bg-yellow-400/10 transition-colors text-base h-11"
          >
            Register
          </Button>
        </a>
      </div>
    </main>
  );
}
