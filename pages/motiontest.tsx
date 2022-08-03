import { useStore } from "../lib/playStore";

export default function Motiontest() {
  const tracks = useStore((state) => state.tracks);
  const activeTrack = useStore((state) => state.activeTrack);

  const handleClick = () => {
    console.log(tracks);
  };

  const fetchData = useStore((state) => state.fetch);

  const activate = () => {
    console.log(tracks[activeTrack].imageUrl);
  };

  return (
    <div className="text-offWhite bg-warning pt-24 flex gap-4">
      <button onClick={handleClick}>Log Tracks</button>
      <button onClick={fetchData}>GetTracks</button>
      <button onClick={activate}>GetTracks</button>
    </div>
  );
}
