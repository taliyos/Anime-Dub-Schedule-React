import { CalendarItem } from "../interfaces/calendarItem";

type CalendarItemProp = {
    calendarItem: CalendarItem;
}

export default function Show(props: CalendarItemProp) {
    return (<div className = "show">
    <div className = "showArt">
        <img alt = {"Key art for " + props.calendarItem.show.name} src = {props.calendarItem.show.image}/>
        <div className = "platforms">
            { props.calendarItem.show.platforms?.map( (platform) => (
                <a className = {"platform " + platform.streamingService.name} href = {platform.link}>
                    <img alt = {"Link to watch on " + platform.streamingService.name }></img>
                </a>
            ))}
        </div>
    </div>
    <div className = "showHover">
        <div className = "showName">{props.calendarItem.show.name}</div>
        <div className = "time">
            <span className = "hours">{ props.calendarItem.time.hour > 12 ? props.calendarItem.time.hour - 12 : props.calendarItem.time.hour}</span>
            :
            <span className = "minutes">{props.calendarItem.time.minute < 10 ? ("0" + props.calendarItem.time.minute.toString()) : props.calendarItem.time.minute}</span>
            <span className = "half">{ props.calendarItem.time.hour > 12 ? "PM" : "AM"}</span>
        </div>
        <div className = "episode">{ props.calendarItem.episodeBatch ? "Season " + (props.calendarItem.season + 1) : "Episode " + props.calendarItem.episode }</div>
    </div>
</div>);
}