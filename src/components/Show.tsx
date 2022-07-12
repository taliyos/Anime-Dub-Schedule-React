import { useState } from "react";
import { Popover } from "react-tiny-popover";

import { CalendarItem } from "../interfaces/calendarItem";
import ShowInfo from "./ShowInfo";

import funimation from "../constants/StreamingServices/funimation.json";
import crunchyroll from "../constants/StreamingServices/crunchyroll.json";
import hidive from "../constants/StreamingServices/hidive.json";
import netflix from "../constants/StreamingServices/netflix.json";
import other from "../constants/StreamingServices/other.json";
import { StreamingService } from "../interfaces/streamingService";

type CalendarItemProp = {
    calendarItem: CalendarItem;
    row: number,
    index: number,
}

export default function Show(props: CalendarItemProp) {

    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    return (
        <div data-row={props.row} data-num={props.index} tabIndex={0} className="show" onMouseOver={() => { setIsPopoverOpen(true); }} onMouseLeave={() => { setIsPopoverOpen(false); }}>
            <Popover align={"start"} padding={0} isOpen={isPopoverOpen} positions={["right", "left", "top"]} content={ <ShowInfo calendarItem = {props.calendarItem}></ShowInfo>
            }>
                <div className="showArt">
                    <img alt={"Key art for " + props.calendarItem.show.name} src={props.calendarItem.show.image} />
                    <div className="platforms">
                        {props.calendarItem.show.platforms?.map((platform) => (
                            <a className={"platform " + platform.streamingService.name} href={platform.link}>
                                <img src={getPlatformImage(platform.streamingService.name)} alt={"Link to watch on " + platform.streamingService.name}></img>
                            </a>
                        ))}
                    </div>
                </div>

            </Popover>
        </div>
    );
}

function getPlatformImage(name: string) {
    if (name.toLowerCase() === "funimation") return (funimation as StreamingService).image;
    else if (name.toLowerCase() === "crunchyroll") return (crunchyroll as StreamingService).image;
    else if (name.toLowerCase() === "hidive") return (hidive as StreamingService).image;
    else if (name.toLowerCase() === "netflix") return (netflix as StreamingService).image;
    else return (other as StreamingService).image;
}