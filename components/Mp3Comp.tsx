import { PlayCircle } from "phosphor-react";
import { useStore } from "../lib/playStore";

function Mp3Comp(mp3: any) {
  let tracks = useStore((state) => state.tracks);
  const setPlay = useStore((state) => state.togglePlaying);
  const setPlaying = (arg: boolean) => setPlay(arg);

  const setActive = useStore((state) => state.setActive);
  const setActiveTrack = (arg: number) => setActive(arg);

  const findSongIndex = (songUrl: any) => {
    return tracks.findIndex((track: any) => track.url === songUrl);
  };

  const setTheTrack = (arg: string) => {
    const trackNumber = findSongIndex(arg);
    setActiveTrack(trackNumber);
    setPlaying(true);
  };

  return (
    <div className="font-normal text-md text-textColor">
      <div
        className="hidden md:flex gap-1 -mb-[2px] py-0 cursor-pointer hover:opacity-75 duration-300"
        onClick={() => setTheTrack(`https:${mp3.mp3.fields.file.url}`)}
      >
        <PlayCircle size={26} />{" "}
        <div className="flex gap-2">
          {" "}
          Extrait :{" "}
          {tracks[findSongIndex(`https:${mp3.mp3.fields.file.url}`)] ? (
            <div>
              {tracks[findSongIndex(`https:${mp3.mp3.fields.file.url}`)].title}
            </div>
          ) : (
            "not"
          )}
        </div>
      </div>
      <div className="md:hidden">
        <audio controls={true} src={mp3.mp3.fields.file.url} />
      </div>
    </div>
  );
}

export default Mp3Comp;
