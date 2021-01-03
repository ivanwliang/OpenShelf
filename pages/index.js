import { useAuth } from '../utils/auth';

export default function Index() {
  const auth = useAuth();

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={() => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={() => auth.signinWithGithub()}>Sign In</button>
  );
}
