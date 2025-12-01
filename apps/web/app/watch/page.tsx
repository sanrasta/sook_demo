'use client';

import dynamic from 'next/dynamic';

const WatchClient = dynamic(() => import('@/components/WatchClient'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen bg-black text-white">Loading Stream...</div>,
});

export default function WatchPage() {
    return <WatchClient />;
}
