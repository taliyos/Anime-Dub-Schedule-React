import { ShowDate } from "../interfaces/showDate"
import ShowDateSection from "./ShowDateSection";

type CalendarProp = {
    calendar: ShowDate[];
}

export default function Calendar(props: CalendarProp) {
    return (
        <section className = "main">
            {
                props.calendar.map( (data, index) => (
                    <ShowDateSection showDate = {data} row = {index}></ShowDateSection>
                ))
            }
        </section>
    );
}