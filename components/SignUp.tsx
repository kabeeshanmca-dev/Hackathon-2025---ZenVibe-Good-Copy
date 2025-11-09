import React, { useState } from 'react';
import { HeartPulseIcon } from './icons';

interface SignUpProps {
  onLogin: (email: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // Simulate sending a code and move to the next step
    console.log(`Simulated verification code for ${email}: 123456`);
    setStep('code');
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For this demo, we'll use a hardcoded verification code.
    if (code === '123456') {
      setError('');
      onLogin(email);
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <HeartPulseIcon className="w-12 h-12 text-violet-400"/>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100">
            ZenVibe
          </h1>
        </div>
        
        {step === 'email' ? (
          <>
            <p className="text-slate-400 mb-8">A safe and supportive space for teens. <br/> Join the community to connect and share.</p>
            <div className="bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Create an Account</h2>
              <p className="text-slate-500 mb-6">Just an email is needed to get started.</p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none text-slate-300 placeholder-slate-500 transition"
                    required
                    aria-label="Email Address"
                  />
                </div>
                {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 disabled:bg-slate-600 transition-colors duration-200"
                >
                  Join ZenVibe
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Verify Your Email</h2>
            <p className="text-slate-500 mb-6">We've "sent" a 6-digit code to <strong className="text-slate-300">{email}</strong>. Please enter it below.</p>
            <p className="text-xs text-slate-500 mb-6">(For this demo, the code is <strong className="text-slate-300">123456</strong>)</p>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <label htmlFor="code" className="sr-only">Verification Code</label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none text-slate-300 placeholder-slate-500 transition text-center tracking-[0.5em]"
                  required
                  maxLength={6}
                  aria-label="Verification Code"
                />
              </div>
              {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 disabled:bg-slate-600 transition-colors duration-200"
              >
                Verify & Sign In
              </button>
            </form>
          </div>
        )}
        <p className="text-xs text-slate-600 mt-6">We respect your privacy. Your email is only used for account creation and will not be displayed publicly.</p>
      </div>
    </div>
  );
};

export default SignUp;