'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Login to Your Account</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in with your email or Google
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
            {error}
          </p>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="my-6 text-center text-sm text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
