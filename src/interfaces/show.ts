import { Platform } from "./platform";

// The representation for a show and all its contents

export interface Show {
    // Show Name
    name: string;
    // Cover/key art
    image: string;
    // AniList ID
    anilistID: number;
    // Movie or Series
    movie: boolean | false;
    // Platforms
    platforms: Platform[];
}