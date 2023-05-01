import { PropsWithChildren } from "react";
interface VideoStreamClientProps extends PropsWithChildren {
  videoSource: string;
  onVideoEnd?: () => any;
  loop?: boolean;
}

export default function VideoStreamClient({ videoSource, onVideoEnd, loop }: VideoStreamClientProps) {
  return (
    <video
      className='flex-1'
      src={videoSource}
      autoPlay
      controls
      muted
      playsInline
      onEnded={onVideoEnd}
      loop={loop ?? false}
    >
      Your browser does not support the video tag.
    </video>
  );
}
