'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Something went wrong');
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create an Account</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign up with your email and password
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
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
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-white transition hover:bg-blue-700 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
