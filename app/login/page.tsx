'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginWithGoogle from '@/components/LoginWithGoogle';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setErrorMsg("Login failed. Please check your credentials.");
    } else {
      router.push('/');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-600 to-indigo-700 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>

        <form onSubmit={handleEmailLogin} className="space-y-5">
          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-2 rounded">{errorMsg}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 rounded font-bold text-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-bold text-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-3 text-gray-500">
          <span>or</span>
        </div>

        <LoginWithGoogle />
      </div>
    </div>
  );
}
