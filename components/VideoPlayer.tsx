import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VPlayerProps {
  url: string;
}
function VideoPlayer({ url }: VPlayerProps) {
  const ref = (player: any) => {
    player = player;
  };
  return (
    <div className="relative pt-[56.25%]">
      <ReactPlayer
        ref={ref}
        className="absolute top-0 left-0"
        controls={true}
        width="100%"
        height="100%"
        url={url}
      />
    </div>
  );
}

export default VideoPlayer;
