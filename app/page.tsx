const CWS_URL =
  "https://chromewebstore.google.com/detail/chrome-tab-suspender/PLACEHOLDER_CWS_ID";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white font-sans">
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600" />
            <span className="font-semibold text-lg">Tab Suspender</span>
          </div>
          <a
            href={CWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Install Free
          </a>
        </div>
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
            Save memory.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Suspend idle tabs.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Automatically suspend tabs you haven&apos;t used in a while. Free up
            RAM and keep your browser fast, even with dozens of tabs open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-3 rounded-lg text-lg transition-colors"
            >
              Add to Chrome &mdash; Free
            </a>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center mb-12">
            Keep your browser lean
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-4">&#9201;</div>
              <h3 className="text-lg font-semibold mb-2">Auto Suspend</h3>
              <p className="text-zinc-400 text-sm">
                Tabs are suspended after a configurable idle timeout. Set it to
                5 minutes or 2 hours &mdash; your call.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-4">&#9989;</div>
              <h3 className="text-lg font-semibold mb-2">Whitelist Domains</h3>
              <p className="text-zinc-400 text-sm">
                Keep important sites always active. Whitelist domains you never
                want suspended.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-4">&#128274;</div>
              <h3 className="text-lg font-semibold mb-2">Smart Protection</h3>
              <p className="text-zinc-400 text-sm">
                Pinned tabs and tabs playing audio are protected by default.
                Your music keeps playing.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            Free to use. Pro when you need more.
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
            The free tier handles everyday tab management. Pro unlocks power
            features for heavy multitaskers.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <div className="text-sm font-medium text-zinc-400 mb-2">Free</div>
              <div className="text-3xl font-bold mb-4">$0</div>
              <ul className="text-sm text-zinc-400 space-y-3 mb-8">
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#10003;</span> Auto-suspend
                  idle tabs
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#10003;</span> Whitelist up
                  to 5 domains
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#10003;</span> Pinned &amp;
                  audio tab protection
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#10003;</span> Keyboard
                  shortcut
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#10003;</span> Suspended tab
                  count badge
                </li>
              </ul>
              <a
                href={CWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Install Free
              </a>
            </div>
            <div className="bg-gradient-to-b from-emerald-500/10 to-teal-500/10 rounded-xl p-8 border border-emerald-500/30">
              <div className="text-sm font-medium text-emerald-400 mb-2">
                Pro
              </div>
              <div className="text-3xl font-bold mb-1">
                $1.99
                <span className="text-lg font-normal text-zinc-400">/mo</span>
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                or $19/year &middot; Cancel anytime
              </div>
              <ul className="text-sm text-zinc-400 space-y-3 mb-8">
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#10003;</span> Everything in
                  Free
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">&#10003;</span> Unlimited domain
                  whitelist
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">&#10003;</span> Tab group
                  suspension rules
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">&#10003;</span> Scheduled
                  suspension windows
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">&#10003;</span> Per-site custom
                  timeouts
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">&#10003;</span> Cloud session
                  backup
                </li>
              </ul>
              <a
                href="#upgrade"
                id="upgrade-btn"
                className="block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Take back your RAM</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Install the free Chrome extension and stop letting idle tabs slow you
            down. No account required.
          </p>
          <a
            href={CWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-3 rounded-lg text-lg transition-colors"
          >
            Add to Chrome &mdash; Free
          </a>
          <p className="text-xs text-zinc-500 mt-4">
            Available on the Chrome Web Store
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          <p>
            Chrome Tab Suspender is built by{" "}
            <a
              href="https://moltcorporation.com"
              className="text-zinc-400 hover:text-white transition-colors"
              target="_blank"
            >
              Moltcorp
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
