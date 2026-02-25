import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SellerFormProps {
  errorMessage?: string;
  registerSellerAction: (formData: FormData) => void | Promise<void>;
}

export const SellerForm = ({
  errorMessage,
  registerSellerAction,
}: SellerFormProps) => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900/70 p-10 sm:p-12">
        <h1 className="text-4xl font-bold text-yellow-400 text-center">
          Register
        </h1>
        <p className="mt-3 text-base text-slate-300 text-center">
          Sign up to create an account and access your orders.
        </p>

        {errorMessage && (
          <div className="mt-5 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-base text-red-200">
            {errorMessage}
          </div>
        )}

        <form action={registerSellerAction} className="mt-7 space-y-5">
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

          <div className="space-y-2">
            <label
              htmlFor="confirm_password"
              className="text-base text-slate-200"
            >
              Confirm Password
            </label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="current-password"
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
            <label htmlFor="first-name" className="text-base text-slate-200">
              First Name
            </label>
            <Input
              id="first-name"
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              autoComplete="given-name"
              className="h-11 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="last-name" className="text-base text-slate-200">
              Last Name
            </label>
            <Input
              id="last-name"
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              autoComplete="family-name"
              className="h-11 text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="shop-name" className="text-base text-slate-200">
              Shop Name
            </label>
            <Input
              id="shop-name"
              name="shop_name"
              type="text"
              placeholder="Enter your shop name"
              autoComplete="organization"
              className="h-11 text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tin-number" className="text-base text-slate-200">
              TIN Number
            </label>
            <Input
              id="tin-number"
              name="tin_number"
              type="text"
              placeholder="Enter your TIN number"
              autoComplete="off"
              className="h-11 text-base"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500 text-base h-11"
          >
            Register
          </Button>
        </form>
      </div>
    </main>
  );
};
