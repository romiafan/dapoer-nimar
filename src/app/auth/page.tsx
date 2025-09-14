"use client";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  auth.onAuthStateChanged(u => setUser(u));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  function handleSignOut() {
    signOut(auth);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      {user ? (
        <div>
          <div className="mb-4">Signed in as <span className="font-bold">{user.email}</span></div>
          <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sign Out</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border p-2 rounded"
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 underline text-sm"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </form>
      )}
    </div>
  );
}
