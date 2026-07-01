import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/');
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const fullName = (user.user_metadata?.full_name ?? user.user_metadata?.user_name ?? user.email ?? 'User') as string;
  const email = user.email ?? '';
  const provider = user.app_metadata?.provider as string | undefined;
  const providerLabel = provider === 'github' ? 'GitHub' : provider === 'google' ? 'Google' : provider ?? 'OAuth';
  const joinedAt = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm">OAuth App</span>
          </div>
          <button
            onClick={async () => { await signOut(); navigate('/'); }}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Welcome header */}
        <div className="mb-8">
          <p className="text-indigo-400 text-sm font-medium mb-1">Signed in successfully</p>
          <h1 className="text-3xl font-bold text-white">Welcome, {fullName.split(' ')[0]}! 👋</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="md:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col items-center text-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className="w-20 h-20 rounded-full border-2 border-indigo-500/50 mb-4 shadow-lg" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center mb-4 text-2xl font-bold text-white shadow-lg">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="text-white font-semibold text-lg leading-tight">{fullName}</h2>
              <p className="text-slate-400 text-sm mt-1 break-all">{email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                {providerLabel}
              </span>
            </div>
          </div>

          {/* Info cards */}
          <div className="md:col-span-2 space-y-4">
            {/* Account details */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Details
              </h3>
              <div className="space-y-3">
                <DetailRow label="User ID" value={user.id} mono />
                <DetailRow label="Email" value={email} />
                <DetailRow label="Auth Provider" value={providerLabel} />
                <DetailRow label="Account Created" value={joinedAt} />
                <DetailRow label="Email Verified" value={user.email_confirmed_at ? 'Yes ✓' : 'No'} />
              </div>
            </div>

            {/* Session info */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Active Session
              </h3>
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <p className="text-green-300 text-sm font-medium">You are authenticated</p>
                  <p className="text-slate-400 text-xs mt-0.5">Your session is active and secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
      <span className="text-slate-400 text-sm shrink-0">{label}</span>
      <span className={`text-slate-200 text-sm text-right break-all ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
    </div>
  );
}
