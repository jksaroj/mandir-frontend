'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Landmark, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]     = useState('');
  const [showPw, setShowPw]         = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier, password }),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Invalid credentials. Please try again.');
        return;
      }
      const { accessToken, refreshToken, user } = data.data;
      localStorage.setItem('sd_token', accessToken);
      localStorage.setItem('sd_refresh', refreshToken);
      localStorage.setItem('sd_user', JSON.stringify(user));
      router.push('/');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf6] flex flex-col">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#1f1515] via-[#2b1717] to-[#3b1111] px-6 py-4">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#ffc65e] to-[#d77719] text-white shadow">
            <Landmark size={22} strokeWidth={1.8} />
          </span>
          <span>
            <span className="block text-base font-bold text-white leading-tight">Sri Devasthanam</span>
            <span className="block text-xs text-white/70">Temple Management System</span>
          </span>
        </Link>
      </div>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="gold-ring bg-white rounded-2xl shadow-md border border-[#f1e7dc] overflow-hidden">
            {/* Header strip */}
            <div className="bg-gradient-to-r from-[#6b2323] to-[#9b3a3a] px-8 py-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Landmark size={28} className="text-white" />
              </div>
              <h1 className="text-xl font-extrabold text-white">Welcome Back</h1>
              <p className="mt-1 text-sm text-white/75">Sign in to your Sri Devasthanam account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Email / Username
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="Enter your email or username"
                  required
                  className="w-full rounded-xl border border-[#e5d5c5] bg-[#fffaf6] px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#6b2323] focus:ring-2 focus:ring-[#6b2323]/10 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-[#e5d5c5] bg-[#fffaf6] px-4 py-2.5 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#6b2323] focus:ring-2 focus:ring-[#6b2323]/10 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input type="checkbox" className="rounded accent-[#6b2323]" />
                  Remember me
                </label>
                <a href="#" className="font-bold text-[#6b2323] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#6b2323] py-3 text-sm font-extrabold text-white shadow hover:bg-[#7f2929] disabled:opacity-60 transition"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <LogIn size={16} />
                )}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="text-center text-xs text-slate-500 font-medium">
                Don&apos;t have an account?{' '}
                <a href="#" className="font-bold text-[#6b2323] hover:underline">
                  Create Account
                </a>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            By signing in, you agree to our{' '}
            <a href="#" className="underline">Terms of Service</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
