export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Every Word has a Meaning and Every Lyric tells a Story.
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 text-xs mt-3">
            © {new Date().getFullYear()} The Swift Dictionary
          </p>
        </div>
      </div>
    </footer>
  );
}

