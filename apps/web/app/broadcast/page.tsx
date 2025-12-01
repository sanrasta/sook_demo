'use client';

import dynamic from 'next/dynamic';

const BroadcastClient = dynamic(() => import('@/components/BroadcastClient'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading Studio...</div>,
});

export default function BroadcastPage() {
    return <BroadcastClient />;
}
