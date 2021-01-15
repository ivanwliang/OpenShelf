import { useAuth } from '@/lib/auth';

export default function Auth() {
  const auth = useAuth();

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={() => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={() => auth.signinWithGitHub('/')}>Sign In</button>
  );
}
