import MuxPlayer from '@mux/mux-player-react'

interface VideoPlayerProps {
  playbackId: string
}

/**
 * VideoPlayer wraps the Mux player component
 * Accepts a playbackId prop which should come from environment variable
 */
function VideoPlayer({ playbackId }: VideoPlayerProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <MuxPlayer
        streamType="on-demand"
        playbackId={playbackId}
        metadata={{
          video_title: 'Sook Live Show',
          viewer_user_id: 'demo-user',
        }}
        className="w-full h-full"
        style={{ aspectRatio: '16/9' }}
      />
    </div>
  )
}

export default VideoPlayer

