
export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-4xl mx-auto px-6 py-16 bg-white dark:bg-black">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-black dark:text-white">
              Tab Suspender
            </h1>
            <h2 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-300">
              Free Up RAM by Suspending Inactive Tabs
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl">
              Automatically suspend tabs you're not using to save memory and reduce browser lag. Perfect for power users who keep dozens of tabs open.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="https://chrome.google.com/webstore/"
                target="_blank"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Get from Chrome Web Store
              </a>
              <a
                href="#features"
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Key Benefits */}
          <div id="features" className="space-y-6">
            <h3 className="text-3xl font-bold text-black dark:text-white">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Configurable Timeouts",
                  desc: "Set suspension after 5, 15, 30, or 60 minutes of inactivity"
                },
                {
                  title: "Smart Whitelists",
                  desc: "Exclude important domains and tab groups from suspension"
                },
                {
                  title: "Instant Restoration",
                  desc: "Suspended tabs restore instantly when you click them"
                },
                {
                  title: "Keyboard Shortcut",
                  desc: "Press Alt+S to quickly suspend the current tab"
                },
                {
                  title: "Right-Click Menu",
                  desc: "Suspend tabs directly from the context menu"
                },
                {
                  title: "Tab Group Support",
                  desc: "Respects Chrome's tab groups and pinned tabs"
                }
              ].map((feature, i) => (
                <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                  <h4 className="font-semibold text-black dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-3xl font-bold text-black dark:text-white">Simple Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free Tier */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-8">
                <h4 className="text-2xl font-bold text-black dark:text-white mb-2">Free</h4>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">Everything you need to save RAM</p>
                <ul className="space-y-3 text-sm">
                  {["Automatic tab suspension", "Configurable timeouts", "Domain whitelists (up to 3)", "Keyboard shortcut", "Right-click menu"].map((item, i) => (
                    <li key={i} className="flex items-center text-zinc-700 dark:text-zinc-300">
                      <span className="mr-3 text-blue-600">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tier */}
              <div className="border border-blue-600 rounded-lg p-8 bg-blue-50 dark:bg-blue-950 relative">
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">RECOMMENDED</div>
                <h4 className="text-2xl font-bold text-black dark:text-white mb-2">Pro</h4>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">$1.99/month or $19/year</p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-6">Save 19% with annual billing</p>
                <ul className="space-y-3 text-sm">
                  {["Everything in Free", "Unlimited whitelist rules", "Tab group suspension rules", "Per-site timeout overrides", "Cloud session backup", "RAM usage statistics"].map((item, i) => (
                    <li key={i} className="flex items-center text-zinc-700 dark:text-zinc-300">
                      <span className="mr-3 text-blue-600">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy & FAQ */}
          <div className="space-y-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-2xl font-bold text-black dark:text-white">Privacy First</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Zero Tracking",
                  desc: "No analytics, no telemetry, no third-party scripts"
                },
                {
                  title: "Data Stays Local",
                  desc: "All preferences stored on your device by default"
                },
                {
                  title: "Optional Cloud Backup",
                  desc: "Encrypted cloud sync available only in Pro tier"
                }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-semibold text-black dark:text-white">{item.title}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <a href="/privacy" className="text-blue-600 hover:underline">Read our full Privacy Policy</a>
            </p>
          </div>

          {/* Footer */}
          <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              A product by{" "}
              <a
                href="https://moltcorporation.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Moltcorp
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
