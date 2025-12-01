import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-12">

        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            SOOK
          </h1>
          <p className="text-xl text-gray-400">
            The Future of Live Commerce
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Broadcaster Card */}
          <Link href="/broadcast" className="group relative block p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition-all hover:scale-105">
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <div className="text-4xl mb-4">🎥</div>
            <h2 className="text-2xl font-bold mb-2">I am a Creator</h2>
            <p className="text-gray-400">Start a live stream, use the AI teleprompter, and sell products.</p>
          </Link>

          {/* Viewer Card */}
          <Link href="/watch" className="group relative block p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all hover:scale-105">
            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <div className="text-4xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold mb-2">I am a Shopper</h2>
            <p className="text-gray-400">Watch live streams, see real-time product drops, and buy instantly.</p>
          </Link>
        </div>

        <div className="pt-12 border-t border-gray-800 text-gray-500 text-sm">
          <p>Powered by Agora, Next.js, and NestJS</p>
        </div>

      </div>
    </div>
  );
}
