'use client';

import { useState, useEffect, useMemo } from 'react';
import useAgora from '@/hooks/useAgora';
import AgoraPlayer from '@/components/AgoraPlayer';
import ProductCard from '@/components/ProductCard';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { io } from 'socket.io-client';

interface Product {
    id: string;
    title: string;
    price: string;
    image: string;
    talkingPoints: string[];
}

export default function WatchPage() {
    const [channel, setChannel] = useState('test');
    const [appid, setAppid] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);

    // Initialize Socket.io
    useEffect(() => {
        const socket = io('http://localhost:3001');

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('viewer:update-product', (product: Product) => {
            console.log('Received product update:', product);
            setActiveProduct(product);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const client = useMemo(() => {
        if (typeof window === 'undefined') return undefined;
        return AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
    }, []);

    const {
        remoteUsers,
        join,
        leave,
    } = useAgora(client);

    useEffect(() => {
        setAppid(process.env.NEXT_PUBLIC_AGORA_APP_ID || '');
    }, []);

    const handleJoin = async () => {
        if (!client || !appid) return;
        try {
            await client.setClientRole('audience');
            await join(appid, channel, null);
            setIsJoined(true);
        } catch (error) {
            console.error('Failed to join stream:', error);
        }
    };

    const handleLeave = async () => {
        await leave();
        setIsJoined(false);
    };

    return (
        <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
            {!isJoined ? (
                <div className="z-10 bg-gray-900 p-8 rounded-2xl border border-gray-800 space-y-4 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-4">Join Stream</h1>
                    <input
                        type="text"
                        placeholder="Channel Name"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        className="w-full p-3 rounded-xl bg-black border border-gray-700 text-white focus:border-blue-500 outline-none transition"
                    />
                    {!process.env.NEXT_PUBLIC_AGORA_APP_ID && (
                        <input
                            type="text"
                            placeholder="App ID (if not in env)"
                            value={appid}
                            onChange={(e) => setAppid(e.target.value)}
                            className="w-full p-3 rounded-xl bg-black border border-gray-700 text-white focus:border-blue-500 outline-none transition"
                        />
                    )}
                    <button
                        onClick={handleJoin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
                    >
                        Watch Now
                    </button>
                </div>
            ) : (
                <>
                    {/* Video Layer */}
                    <div className="absolute inset-0">
                        {remoteUsers.length > 0 ? (
                            remoteUsers.map((user) => (
                                <AgoraPlayer
                                    key={user.uid}
                                    videoTrack={user.videoTrack}
                                    className="w-full h-full object-cover"
                                />
                            ))
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 animate-pulse">
                                Waiting for host...
                            </div>
                        )}
                    </div>

                    {/* Overlay Layer */}
                    <div className="absolute top-4 left-4 z-20">
                        <button
                            onClick={handleLeave}
                            className="bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm hover:bg-black/70 transition"
                        >
                            ← Leave
                        </button>
                    </div>

                    {/* Product Overlay */}
                    <div className="absolute bottom-8 right-4 z-20">
                        {activeProduct ? (
                            <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
                                <ProductCard
                                    title={activeProduct.title}
                                    price={activeProduct.price}
                                    image={activeProduct.image}
                                    onBuy={() => alert(`Added ${activeProduct.title} to cart!`)}
                                />
                            </div>
                        ) : (
                            <div className="bg-black/50 p-4 rounded text-white">Waiting for product...</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
