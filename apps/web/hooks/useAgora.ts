import { useState, useEffect } from 'react';
import AgoraRTC, {
    IAgoraRTCClient,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
    UID,
} from 'agora-rtc-sdk-ng';

export default function useAgora(client: IAgoraRTCClient | undefined) {
    const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | undefined>(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | undefined>(undefined);
    const [joinState, setJoinState] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState<any[]>([]);

    useEffect(() => {
        if (!client) return;

        setRemoteUsers(client.remoteUsers);

        const handleUserPublished = async (user: any, mediaType: 'audio' | 'video') => {
            await client.subscribe(user, mediaType);
            setRemoteUsers((prevUsers) => {
                // Update the user in the list if they already exist, or add them
                const exists = prevUsers.find((u) => u.uid === user.uid);
                if (exists) {
                    return prevUsers.map((u) => (u.uid === user.uid ? user : u));
                }
                return [...prevUsers, user];
            });
        };

        const handleUserUnpublished = (user: any) => {
            setRemoteUsers((prevUsers) => {
                // We don't necessarily remove them immediately if we want to show a placeholder, 
                // but for now let's keep it simple.
                // Actually, Agora keeps the user in remoteUsers but the track is gone.
                // We'll just trigger a re-render.
                return [...client.remoteUsers];
            });
        };

        const handleUserJoined = (user: any) => {
            setRemoteUsers((prevUsers) => [...prevUsers, user]);
        };

        const handleUserLeft = (user: any) => {
            setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
        };

        client.on('user-published', handleUserPublished);
        client.on('user-unpublished', handleUserUnpublished);
        client.on('user-joined', handleUserJoined);
        client.on('user-left', handleUserLeft);

        return () => {
            client.off('user-published', handleUserPublished);
            client.off('user-unpublished', handleUserUnpublished);
            client.off('user-joined', handleUserJoined);
            client.off('user-left', handleUserLeft);
        };
    }, [client]);

    const join = async (appid: string, channel: string, token: string | null, uid: UID | null = null) => {
        if (!client) return;
        await client.join(appid, channel, token, uid);
        setJoinState(true);
    };

    const leave = async () => {
        if (localAudioTrack) {
            localAudioTrack.stop();
            localAudioTrack.close();
        }
        if (localVideoTrack) {
            localVideoTrack.stop();
            localVideoTrack.close();
        }
        setLocalAudioTrack(undefined);
        setLocalVideoTrack(undefined);
        setRemoteUsers([]);
        setJoinState(false);
        await client?.leave();
    };

    const publishLocalTracks = async () => {
        if (!client) return;
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalAudioTrack(microphoneTrack);
        setLocalVideoTrack(cameraTrack);
        await client.publish([microphoneTrack, cameraTrack]);
    };

    return {
        localAudioTrack,
        localVideoTrack,
        joinState,
        leave,
        join,
        remoteUsers,
        publishLocalTracks
    };
}
