import { PropsWithChildren } from "react";
interface VideoStreamClientProps extends PropsWithChildren {
  videoSource: string;
  onVideoEnd?: () => any;
}

export default function VideoStreamClient(input: VideoStreamClientProps) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-8 gap-4'>
      <video className='flex-1' src={input.videoSource} autoPlay onEnded={input.onVideoEnd}>
        Your browser does not support the video tag.
      </video>
      <div className='flex-16'>
        {input.children}
      </div>
    </div>
  );
}
