import create from "zustand";
import { Track } from "./types";

interface TrackState {
  playing: boolean;
  loading: boolean;
  hasErrors: boolean;
  setPlaying: () => void;
  setStop: () => void;
  togglePlaying: (val: boolean) => void;
  tracks: Track[];
  fetch: () => void;
  activeTrack: number;
  setActive: (arg: number) => void;
  populateStore: (newTracks: Track[]) => void;
}

export const useStore = create<TrackState>((set) => ({
  playing: false,
  loading: false,
  hasErrors: false,
  setPlaying: () => set((state) => ({ playing: true })),
  setStop: () => set((state) => ({ playing: false })),
  togglePlaying: (val: boolean) => set(() => ({ playing: val })),
  tracks: [
    {
      id: "saint-louis",
      title: "Saint Louis",
      imageUrl:
        "https://images.ctfassets.net/fsfv0idsnzee/5XnVCixrNeQaRi8mCfJZ5Y/c99686b5d2224dbdc08949476016afac/menagerie.jpg",
      spectacle: "La Ménagerie de verre",
      url: "https://assets.ctfassets.net/fsfv0idsnzee/1NfSmTJnKsr3WRoHsDSPZE/1730767f1de08fba9b495f313ed2bb2b/Menagerie_Saint-Louis.mp3",
    },
  ],
  fetch: async () => {
    const tempTracks = [];
    set(() => ({ loading: true }));
    try {
      const res = await fetch("/api/tracking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      set((state) => ({
        tracks: (state.tracks = result),
        loading: false,
      }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  activeTrack: 0,
  setActive: (arg: number) => set(() => ({ activeTrack: arg })),
  populateStore: (newTracks: Track[]) => set(() => ({ tracks: newTracks })),
}));
