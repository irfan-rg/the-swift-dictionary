import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-4">
        Page Not Found
      </span>
      <h1 className="font-display text-8xl md:text-9xl font-medium text-[var(--foreground)] mb-6">
        404
      </h1>
      <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mb-8 opacity-50" />
      <p className="font-body text-base text-[var(--foreground-muted)] mb-10 max-w-md leading-relaxed">
        This page doesn&apos;t exist — like a bridge that was never burned.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
