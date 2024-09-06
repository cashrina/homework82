import {Model} from 'mongoose';

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

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface UsersMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UsersModel = Model<UserFields, {}, UsersMethods>