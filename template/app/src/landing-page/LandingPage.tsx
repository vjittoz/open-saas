export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-[#39ff14]">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl font-black uppercase tracking-widest text-[#39ff14] sm:text-6xl">
          Recover $2,000+ per missed call with our AI Text-Back Agent
        </h1>
        <p className="mt-8 max-w-3xl text-lg text-green-200">
          LeadBot 360 converts uncaptured missed calls into secure warm leads in
          seconds. Send an instant, kind, and conversion-focused reply that
          pushes prospects to book instantly.
        </p>

        <div className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            "Dark Industrial theme",
            "Neon Green conversion accents",
            "Automate Twilio missed-call responses",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-green-600/40 bg-gray-900/70 p-5 text-left shadow-lg shadow-green-500/20"
            >
              <p className="text-lg font-semibold text-green-100">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-green-600/40 bg-gray-900/90 p-8 text-left text-green-100 shadow-2xl shadow-green-500/20">
          <h2 className="text-neon-green text-2xl font-bold">How it works</h2>
          <ol className="mt-4 list-decimal space-y-2 text-left text-green-200">
            <li>Twilio POSTs missed-call event to /api/webhook/missed-call.</li>
            <li>
              LeadBot 360 drafts a custom message based on the business type.
            </li>
            <li>
              Lead information is stored for insights and revenue tracking.
            </li>
            <li>Go to /dashboard to view recovered revenue and leads.</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
