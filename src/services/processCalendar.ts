import { days } from "../constants/time";
import { CalendarItem } from "../interfaces/calendarItem";
import { ShowDate } from "../interfaces/showDate";

export function processCalendar(calendar: CalendarItem[]) {
    let showDateCalendar: ShowDate[] = [];

    for (let i = 0; i < calendar.length; i++) {
        let calDate = new Date(Date.UTC(calendar[i].time.year, calendar[i].time.month, calendar[i].time.day, calendar[i].time.hour, calendar[i].time.minute));
        calendar[i].time.hour = calDate.getHours();
        calendar[i].time.minute = calDate.getMinutes();
        if (showDateCalendar.length === 0 || (
            calDate.getFullYear() !== showDateCalendar[showDateCalendar.length - 1].year
            || calDate.getMonth() !== showDateCalendar[showDateCalendar.length - 1].month
            || calDate.getDate() !== showDateCalendar[showDateCalendar.length - 1].day
        )) {
            // Create a new ShowDate
            showDateCalendar.push({
                year: calDate.getFullYear(),
                month: calDate.getMonth(),
                day: calDate.getDate(),
                dayOfWeek: days[calDate.getDay()],
                calendarItems: [calendar[i]],
            });
        }
        else {
            // Add the calendar item to the last show date
            showDateCalendar[showDateCalendar.length - 1].calendarItems.push(calendar[i]);
        }
    }

    return showDateCalendar;
}