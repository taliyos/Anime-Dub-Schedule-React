import { CalendarItem } from "../interfaces/calendarItem";


type ShowInfoProp = {
    calendarItem: CalendarItem;
}

export default function ShowInfo(props: ShowInfoProp) {
    return (
        <div className="showHover">
            <div className="showName">{props.calendarItem.show.name}</div>
            <div className="time">
                <span className="hours">{props.calendarItem.time.hour > 12 ? props.calendarItem.time.hour - 12 : props.calendarItem.time.hour}</span>
                :
                <span className="minutes">{props.calendarItem.time.minute < 10 ? ("0" + props.calendarItem.time.minute.toString()) : props.calendarItem.time.minute}</span>
                <span className="half">{props.calendarItem.time.hour > 12 ? "PM" : "AM"}</span>
            </div>
            <div className="episode">{props.calendarItem.episode === "Batch" ? "Season " + (props.calendarItem.season) : "Episode " + props.calendarItem.episode}</div>
        </div>);
}