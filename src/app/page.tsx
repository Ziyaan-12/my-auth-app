import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-blue-600 dark:text-blue-400">AuthApp</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
          A secure, modern authentication system with email/password & Google sign-in.
          Powered by Next.js, Prisma, and NextAuth.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/login">
            <button className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition">
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button className="rounded-md border border-gray-300 dark:border-gray-700 px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-10">Why Choose AuthApp?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <Feature title="🔐 Secure Auth" description="Passwords hashed using bcrypt. Sessions managed via JWT." />
            <Feature title="🌐 Google Sign-In" description="Use Google OAuth 2.0 for seamless login." />
            <Feature title="📊 Protected Dashboard" description="Private dashboard visible only to authenticated users." />
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
