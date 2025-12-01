'use client';

import { ICameraVideoTrack, IRemoteVideoTrack } from 'agora-rtc-sdk-ng';
import { useEffect, useRef } from 'react';

interface AgoraPlayerProps {
    videoTrack: ICameraVideoTrack | IRemoteVideoTrack | undefined;
    className?: string;
}

export default function AgoraPlayer({ videoTrack, className }: AgoraPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !videoTrack) return;

        // Play the video track in the container
        videoTrack.play(containerRef.current);

        return () => {
            // Do not stop the track here, as it might be used elsewhere or we want to keep it alive.
            // Just let the component unmount. 
            // However, if we want to ensure the video element is removed, Agora handles that when we play elsewhere or stop.
            // But for a clean UI, we might want to ensure it doesn't leave artifacts.
            // videoTrack.stop() is for stopping media transmission/reception.
        };
    }, [videoTrack]);

    return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
