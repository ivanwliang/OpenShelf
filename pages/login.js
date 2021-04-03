import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function Login() {
  const auth = useAuth();

  return (
    <div>
      <Navbar />
      <div className="mt-8 min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="border bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <div className="sm:max-w-md sm:w-full sm:mx-auto">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Sign In
              </h2>
            </div>
            <div className="text-center mt-6 space-y-6 flex-col">
              <button
                type={"button"}
                onClick={() => auth.signinWithGoogle("/dashboard")}
                className="w-3/4 py-3 px-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Sign in with Google
              </button>

              <button
                type={"button"}
                onClick={() => auth.signinWithGitHub("/dashboard")}
                className="w-3/4 py-3 px-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
