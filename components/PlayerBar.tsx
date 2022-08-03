import Image from "next/image";
import ReactHowler from "react-howler";
import { useStore } from "../lib/playStore";
import { useRef, useState, useMemo, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "phosphor-react";
import { Track } from "../lib/types";

interface PlayerBarProps {
  currentPage: string;
}

function PlayerBar({ currentPage }: PlayerBarProps) {
  const fetchData = useStore((state) => state.fetch);

  const [isSeeking, setIsSeeking] = useState(false);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [volume, setVolume] = useState(1);
  const soundRef = useRef(null);

  const setActiveTrack = (arg: number) => setActive(arg);

  useEffect(() => {
    fetchData();
    setActiveTrack(0);
  }, []);

  let tracks = useStore((state) => state.tracks);

  const activeTrack = useStore((state) => state.activeTrack);

  const setActive = useStore((state) => state.setActive);

  const playing = useStore((state) => state.playing);

  const setPlay = useStore((state) => state.togglePlaying);
  const setPlaying = (arg: boolean) => setPlay(arg);

  const displayDuration = useMemo(() => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return seconds < 10
      ? `${minutes}:0${seconds.toFixed()}`
      : `${minutes}:${seconds.toFixed()}`;
  }, [duration]);

  const displaySeekTime = useMemo(() => {
    let seekFix = seek.toFixed();
    const minutes = Math.floor(Number(seekFix) / 60);
    const seconds = Number(seekFix) - minutes * 60;
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }, [seek]);

  const displayVolume = useMemo(() => {
    const fixedValue = volume * 100;
    return fixedValue.toFixed();
  }, [volume]);

  useEffect(() => {
    let timerId: any;

    if (playing && !isSeeking) {
      const f = () => {
        // @ts-ignore
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const handlePlay = (activeTrack?: any) => {
    activeTrack;
  };

  const previousTrack = () => {
    if (activeTrack === 0) {
      setActiveTrack(0);
    } else {
      setActiveTrack(activeTrack - 1);
    }
  };

  const nextTrack = () => {
    if (activeTrack === tracks.length - 1) {
      setActiveTrack(0);
    } else {
      setActiveTrack(activeTrack + 1);
    }
  };

  const onEnd = () => {
    nextTrack();
  };

  const onLoad = () => {
    // @ts-ignore
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e: any) => {
    setSeek(parseFloat(e));
    // @ts-ignore
    soundRef.current.seek(e);
  };

  return (
    <div>
      {tracks ? (
        <div>
          <div
            className={`${
              currentPage === "/"
                ? "bg-offWhite bg-opacity-20"
                : "bg-midnight bg-opacity-40"
            } hidden fixed bottom-0 md:flex text-offWhite h-[50px] justify-between px-4 w-full max-w-screen-2xl`}
          >
            <div className="flex items-center w-[20%]">
              <div className="rounded">
                {tracks[activeTrack].imageUrl ? (
                  <picture className="rounded">
                    <img
                      className="rounded-full w-[40px] h-[40px]"
                      src={tracks[activeTrack].imageUrl}
                      alt="Track Image"
                    />
                  </picture>
                ) : (
                  "image"
                )}
              </div>
              <div className="px-4 font-light">
                <div className="m-0 p-0 text-sm leading-snug">
                  {tracks[activeTrack].title} -
                </div>
                <div className="m-0 p-0 text-sm leading-none">
                  {tracks[activeTrack].spectacle}
                </div>
              </div>
            </div>
            <div className="px-4 flex items-center w-[60%]">
              <div className="w-full">
                <ReactHowler
                  playing={playing}
                  src={tracks[activeTrack].url}
                  ref={soundRef}
                  volume={volume}
                  onLoad={onLoad}
                  onEnd={onEnd}
                />
                <div className="flex items-center">
                  <div className="flex items-center gap-4 w-[15%] text-lg">
                    <div className="playerSkipBack">
                      <SkipBack onClick={() => previousTrack()} />
                    </div>
                    <div className="playerPlay">
                      {playing ? (
                        <Pause onClick={() => setPlayState(false)} />
                      ) : (
                        <Play
                          onClick={() => {
                            setPlayState(true);
                            handlePlay();
                          }}
                        />
                      )}
                    </div>
                    <div className="playerSkipForward">
                      <SkipForward onClick={() => nextTrack()} />
                    </div>
                  </div>
                  <div className="px-8 gap-4 flex items-center w-[85%]">
                    <div>{displaySeekTime}</div>
                    <div className="pt-[5px] w-full ">
                      <input
                        disabled
                        className="w-[95%]"
                        type="range"
                        min="1"
                        max={duration ? duration.toFixed(2) : 0}
                        value={seek}
                      />
                    </div>
                    <div className="playerTotalTime">{displayDuration}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-[20%]">
              <div>Volume : {displayVolume}</div>
              <label className="flex items-center px-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step=".01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-egg">Loading</div>
      )}
    </div>
  );
}

export default PlayerBar;
