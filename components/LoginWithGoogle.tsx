"use client";

export default function LoginWithGoogle() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="
        flex items-center justify-center
        space-x-3
        px-5 py-3
        bg-white
        border border-gray-300
        rounded-md
        shadow-sm
        text-gray-700
        font-semibold
        hover:bg-gray-100
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600
        transition
        duration-150
        ease-in-out
        max-w-xs
        mx-auto
      "
      aria-label="Sign in with Google"
      type="button"
    >
      <GoogleLogo />
      <span>Sign in with Google</span>
    </button>
  );
}

function GoogleLogo() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 533.5 544.3"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285f4"
        d="M533.5 278.4c0-18.6-1.6-36.5-4.7-53.9H272.1v102.1h146.4c-6.3 34-25.5 62.9-54.6 82.1v68h88.3c51.7-47.6 81.3-117.7 81.3-198.3z"
      />
      <path
        fill="#34a853"
        d="M272.1 544.3c73.4 0 135.1-24.3 180.1-65.8l-88.3-68c-24.5 16.4-56 26-91.8 26-70.5 0-130.4-47.6-151.8-111.3h-89v69.9c44.5 87.6 136.2 149.2 240.8 149.2z"
      />
      <path
        fill="#fbbc04"
        d="M120.3 326.4c-10.9-32.7-10.9-67.7 0-100.4v-69.9h-89c-39.1 76.1-39.1 167.3 0 243.4l89-69.9z"
      />
      <path
        fill="#ea4335"
        d="M272.1 107.7c39.7-.6 77.8 14.3 106.6 41.2l79.7-79.7C404.4 24.9 345.3 0 272.1 0 167.5 0 75.9 61.6 31.3 149.2l89 69.9c21.5-63.7 81.4-111.4 151.8-111.4z"
      />
    </svg>
  );
}
