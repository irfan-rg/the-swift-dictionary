export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen px-4 py-24 pb-32">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-handwriting text-2xl text-[var(--accent)] block mb-4">
            Legal & Privacy
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-[var(--foreground)] mb-6">
            Privacy Policy
          </h1>
          <p className="font-body text-lg text-[var(--foreground-muted)] max-w-xl mx-auto leading-relaxed">
            A transparent overview of how we handle your data while you explore the vocabulary of Taylor Swift.
          </p>
          <div className="w-24 h-px bg-[var(--border)] mx-auto mt-12" />
        </div>

        <div className="space-y-12 font-body text-[var(--foreground)] leading-relaxed prose prose-invert max-w-none">
          
          <section>
            <h2 className="font-display text-3xl font-medium mb-4 text-[var(--foreground)]">1. Information We Collect</h2>
            <p className="text-[var(--foreground-muted)]">
              The Swift Dictionary is a hobbyist project designed for fans. We believe in keeping data collection to an absolute minimum. We only collect the information necessary to provide you with a personalized experience:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[var(--foreground-muted)] marker:text-[var(--accent)]">
              <li><strong>Authentication Data:</strong> When you sign in using Google or email, we receive your email address and display name (if provided) to create and manage your account.</li>
              <li><strong>Saved Favorites:</strong> The songs, albums, and words you choose to save to your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-medium mb-4 text-[var(--foreground)]">2. How We Use Your Information</h2>
            <p className="text-[var(--foreground-muted)]">
              We use the collected information exclusively for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[var(--foreground-muted)] marker:text-[var(--accent)]">
              <li>To provide and maintain your user account (via Supabase authentication).</li>
              <li>To allow you to save and retrieve your favorite dictionary entries.</li>
              <li>To ensure the security and integrity of the application.</li>
            </ul>
            <p className="mt-4 text-[var(--foreground)] font-medium bg-[var(--surface)] p-4 border border-[var(--border)] rounded-sm">
              We do not sell, rent, or share your personal information with any third parties for marketing or advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-medium mb-4 text-[var(--foreground)]">3. Cookies & Local Storage</h2>
            <p className="text-[var(--foreground-muted)]">
              Our application uses essential cookies and local storage primarily to maintain your authentication session. These are strictly necessary for the site to function properly (e.g., keeping you logged in as you navigate between pages). We do not use tracking cookies for targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-medium mb-4 text-[var(--foreground)]">4. Data Security</h2>
            <p className="text-[var(--foreground-muted)]">
              We implement industry-standard security measures through our authentication provider, Supabase, to strictly protect your personal information. However, please remember that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-medium mb-4 text-[var(--foreground)]">5. Third-Party Services</h2>
            <p className="text-[var(--foreground-muted)]">
              Our site uses Google OAuth for authentication. By using this service, you are also subject to Google&apos;s own privacy policies and terms of service regarding the data they manage.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-medium mb-4 text-[var(--foreground)]">6. Your Rights</h2>
            <p className="text-[var(--foreground-muted)]">
              You have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, or simply wish to delete your account entirely, please log into your account settings or contact the developer.
            </p>
          </section>

          <div className="w-full h-px bg-[var(--border)] my-12" />

          <section className="text-center">
            <h2 className="font-display text-2xl font-medium mb-4 text-[var(--foreground)]">Contact</h2>
            <p className="text-[var(--foreground-muted)] max-w-lg mx-auto">
              If you have any questions, concerns, or feedback about this Privacy Policy, please reach out.
            </p>
            <div className="mt-8">
              <span className="inline-block px-6 py-2 border border-[var(--border)] rounded-sm font-body text-sm text-[var(--foreground)] bg-[var(--surface-raised)]">
                Effective Date: March 2026
              </span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
