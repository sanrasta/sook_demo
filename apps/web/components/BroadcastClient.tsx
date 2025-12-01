'use client';

import { useState, useEffect, useMemo } from 'react';
import useAgora from '@/hooks/useAgora';
import AgoraPlayer from '@/components/AgoraPlayer';
import AgoraRTC from 'agora-rtc-sdk-ng';
import Teleprompter from '@/components/Teleprompter';
import { io } from 'socket.io-client';

interface Product {
    id: string;
    title: string;
    price: string;
    image: string;
    talkingPoints: string[];
}

export default function BroadcastClient() {
    const [channel, setChannel] = useState('test');
    const [appid, setAppid] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [socket, setSocket] = useState<any>(null);

    // Initialize Socket.io
    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, []);

    // Fetch Products
    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Failed to fetch products', err));
    }, []);

    // Initialize Agora Client
    const client = useMemo(() => {
        if (typeof window === 'undefined') return undefined;
        return AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
    }, []);

    const {
        localVideoTrack,
        localAudioTrack,
        joinState,
        leave,
        join,
        publishLocalTracks,
    } = useAgora(client);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_AGORA_APP_ID) {
            setAppid(process.env.NEXT_PUBLIC_AGORA_APP_ID);
        }
    }, []);

    const handleStart = async () => {
        if (!client || !appid) return;
        try {
            await client.setClientRole('host');
            await publishLocalTracks();
            await join(appid, channel, null);
        } catch (error) {
            console.error('Failed to start stream:', error);
        }
    };

    const handleStop = async () => {
        await leave();
    };

    const handleNextProduct = () => {
        if (products.length === 0) return;
        const nextIndex = (currentProductIndex + 1) % products.length;
        setCurrentProductIndex(nextIndex);
        const nextProduct = products[nextIndex];

        // Emit event to server
        if (socket) {
            socket.emit('host:change-product', nextProduct.id);
        }
    };

    const currentProduct = products[currentProductIndex];

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Left: Controls & Teleprompter */}
            <div className="w-1/3 p-6 flex flex-col gap-6 border-r border-gray-800 bg-gray-900/50 backdrop-blur">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Creator Dashboard</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className={`w-2 h-2 rounded-full ${joinState ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                        {joinState ? 'LIVE' : 'OFFLINE'}
                    </div>
                </div>

                {/* Teleprompter */}
                {currentProduct && (
                    <Teleprompter
                        talkingPoints={currentProduct.talkingPoints}
                        productTitle={currentProduct.title}
                    />
                )}

                {/* Product Timeline Controls */}
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase">Current Product</h3>
                    {currentProduct ? (
                        <div className="flex items-center gap-4 mb-4">
                            <img src={currentProduct.image} alt={currentProduct.title} className="w-16 h-16 rounded-lg object-cover bg-gray-700" />
                            <div>
                                <p className="font-bold">{currentProduct.title}</p>
                                <p className="text-sm text-green-400">{currentProduct.price}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 mb-4">Loading products...</p>
                    )}

                    <button
                        onClick={handleNextProduct}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                    >
                        Next Product →
                    </button>
                </div>

                {/* Stream Controls */}
                <div className="mt-auto">
                    {!joinState ? (
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Channel Name"
                                value={channel}
                                onChange={(e) => setChannel(e.target.value)}
                                className="w-full p-3 rounded bg-black border border-gray-700 text-white"
                            />
                            {!process.env.NEXT_PUBLIC_AGORA_APP_ID && (
                                <input
                                    type="text"
                                    placeholder="App ID (if not in env)"
                                    value={appid}
                                    onChange={(e) => setAppid(e.target.value)}
                                    className="w-full p-3 rounded bg-black border border-gray-700 text-white"
                                />
                            )}
                            <button
                                onClick={handleStart}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                            >
                                Go Live
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleStop}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            End Stream
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Preview */}
            <div className="flex-1 bg-black relative flex items-center justify-center">
                {localVideoTrack ? (
                    <div className="w-full h-full">
                        <AgoraPlayer videoTrack={localVideoTrack} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="text-gray-600">Camera Preview</div>
                )}
            </div>
        </div>
    );
}
