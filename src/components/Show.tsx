import { useState } from "react";

import { CalendarItem } from "../interfaces/calendarItem";
import { Popover } from "react-tiny-popover";

import funimation from "../constants/StreamingServices/funimation.json";
import crunchyroll from "../constants/StreamingServices/crunchyroll.json";
import hidive from "../constants/StreamingServices/hidive.json";
import netflix from "../constants/StreamingServices/netflix.json";
import { StreamingService } from "../interfaces/streamingService";

type CalendarItemProp = {
    calendarItem: CalendarItem;
}

function getPlatformImage(name: string) {
    if (name.toLowerCase() === "funimation") return (funimation as StreamingService).image;
    if (name.toLowerCase() === "crunchyroll") return (crunchyroll as StreamingService).image;
    if (name.toLowerCase() === "hidive") return (hidive as StreamingService).image;
    if (name.toLowerCase() === "netflix") return (netflix as StreamingService).image;
}

export default function Show(props: CalendarItemProp) {

    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    return (
    <div className = "show" onMouseOver = {() => {setIsPopoverOpen(true);}} onMouseLeave = {() => {setIsPopoverOpen(false);}}>
        <Popover align = {"start"} padding = {0} isOpen={isPopoverOpen} positions = {["right", "left"]} content = {
            <div className = "showHover">
                <div className = "showName">{props.calendarItem.show.name}</div>
                <div className = "time">
                    <span className = "hours">{ props.calendarItem.time.hour > 12 ? props.calendarItem.time.hour - 12 : props.calendarItem.time.hour}</span>
                    :
                    <span className = "minutes">{props.calendarItem.time.minute < 10 ? ("0" + props.calendarItem.time.minute.toString()) : props.calendarItem.time.minute}</span>
                    <span className = "half">{ props.calendarItem.time.hour > 12 ? "PM" : "AM"}</span>
                </div>
                <div className = "episode">{ props.calendarItem.episode === "Batch" ? "Season " + (props.calendarItem.season) : "Episode " + props.calendarItem.episode }</div>
            </div>
    }>
        <div className = "showArt">
        <img alt = {"Key art for " + props.calendarItem.show.name} src = {props.calendarItem.show.image}/>
        <div className = "platforms">
            { props.calendarItem.show.platforms?.map( (platform) => (
                <a className = {"platform " + platform.streamingService.name} href = {platform.link}>
                    <img src = {getPlatformImage(platform.streamingService.name)} alt = {"Link to watch on " + platform.streamingService.name }></img>
                </a>
            ))}
        </div>
    </div>

        </Popover>
    </div>
);
}