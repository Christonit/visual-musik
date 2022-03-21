export type userInfoI = {
    country?: string;
    display_name: string;
    email?: string;
    explicit_content?: {
        filter_enabled: boolean;
        filter_locked: boolean;
        [key: string]: boolean;
    };
    external_urls?: {
        spotify: string;
    };
    followers?: {
        [key: string]: number | null;
    };
    href?: string;
    id: string | number;
    images?: {
        height: string | null;
        width: string | null;
        url: string;
    }[];
    product?: string;
    type?: string;
    uri?: string;
};


export interface trackI {
    id : string,
    name: string,
    duration: string,
    artists : {id : string, name: string}[],
}

export interface ActivePlaylistI {
    id : string,
    cover_image : string,
    name: string,
    owner : string,
    tracks : trackI[]
}