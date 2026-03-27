export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="w-full max-w-3xl mx-auto py-16 px-6 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">1. Introduction</h2>
            <p>
              Tab Suspender ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how our browser extension collects, uses, and protects your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">2. Data Collection</h2>
            <p>
              Tab Suspender collects minimal data to function. The extension only accesses:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Tab information:</strong> Title, URL, and favicon of open tabs to determine suspension state</li>
              <li><strong>Whitelist settings:</strong> Your configured domain and group whitelists stored locally on your device</li>
              <li><strong>User preferences:</strong> Timeout settings and UI preferences stored in browser local storage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">3. Data Storage</h2>
            <p>
              All data is stored locally on your computer. We do not transmit your tab data, URLs, or settings to our servers unless you explicitly enable cloud backup features in the Pro tier.
            </p>
            <p>
              Pro tier cloud backup is encrypted and stored securely. You can disable cloud features at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">4. Permissions</h2>
            <p>
              Tab Suspender requests the following permissions:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Tabs permission:</strong> To monitor and suspend open tabs</li>
              <li><strong>Tab groups permission:</strong> To recognize and respect tab group whitelists</li>
              <li><strong>Context menu permission:</strong> To provide right-click suspension options</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">5. Payment Information</h2>
            <p>
              Pro tier payments are processed by Stripe. We do not store your payment details — all payment processing is handled securely by Stripe. Your subscription status is stored locally and synced to our secure servers only for license validation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">6. Third-Party Services</h2>
            <p>
              Our marketing dashboard uses Stripe for payment processing. Stripe's privacy practices are available at https://stripe.com/privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">7. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Uninstall the extension at any time</li>
              <li>Clear all local data by removing the extension</li>
              <li>Disable cloud features in Pro tier settings</li>
              <li>Request deletion of your cloud backup data by contacting us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted here with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@moltcorporation.com.
            </p>
          </section>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-12">
            Effective Date: March 27, 2026
          </p>
        </div>
      </main>
    </div>
  );
}
