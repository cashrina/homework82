export interface ArtistMutation {
    name: string;
    image: string | null;
    info: string | null;
}

export interface AlbumMutation {
    name: string;
    artist: string;
    year: string;
    image: string | null;
}

export interface TrackMutation {
    name: string;
    album: string;
    duration: string;
}