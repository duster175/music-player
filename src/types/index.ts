export interface Track {
  id: number | string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  src: string;
  cover: string;
}

export interface Playlist {
  id: string;
  name: string;
  trackIds: (number | string)[];
}
