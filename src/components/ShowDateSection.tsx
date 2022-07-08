import { ShowDate } from "../interfaces/showDate";
import { months } from "../constants/time";
import Show from "./Show";

type ShowDateProp = {
    showDate: ShowDate;
}

export default function ShowDateSection(props: ShowDateProp) {
    return (
    <div className = "showSection">
    <div className = "date">
        <h2>{months[props.showDate.month]}<br></br><span className = "dateNum">{props.showDate.day}</span></h2>
    </div>
    <div className = "shows">
        <div className = "dayOfWeek"><h3>{props.showDate.dayOfWeek}</h3></div>
        <div className = "showImages">
            { props.showDate.calendarItems?.map( (calItem) => (
                <Show calendarItem = {calItem}/>
            ))}
        </div>
    </div>
</div>);
}