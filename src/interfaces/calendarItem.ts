import { Show } from "./show";
import { ReleaseTime } from "./releaseTime";

export interface CalendarItem {
    show: Show;
    // Season #
    season: number | 0;
    // Episode #
    episode: string | "";
    // Episode Batch
    episodeBatch: boolean | false;
    // Release Time
    time: ReleaseTime;
}