import Link from "next/link";
export const metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <div className="container-safe py-16 max-w-md">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Create Account</h1>
      <form className="space-y-4 card p-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-ring"
            placeholder="you@example.org"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-ring"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-rg-purple600 text-white text-sm font-semibold px-4 py-2 shadow-sm-soft hover:bg-rg-purple700 focus-ring"
        >
          Create Account
        </button>
        <div className="text-xs text-gray-500 leading-relaxed">
          By creating an account you agree to respectful use & safeguarding
          standards.
        </div>
      </form>
      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-rg-purple600 hover:text-rg-purple700 font-medium"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
