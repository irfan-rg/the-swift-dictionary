import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="font-playfair text-6xl font-bold text-neutral-900 dark:text-white mb-4">
        404
      </h1>
      <div className="h-[2px] w-20 accent-gradient rounded-full opacity-80 mb-6" />
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        This page doesn&apos;t exist — like a bridge that was never burned.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:shadow transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Go Home
      </Link>
    </div>
  );
}
