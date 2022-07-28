import { days } from "../constants/time";
import { CalendarItem } from "../interfaces/calendarItem";
import { ShowDate } from "../interfaces/showDate";

export function processCalendar(calendar: CalendarItem[]) {
    let showDateCalendar: ShowDate[] = [];
    
    let lastNewDay = -1;

    for (let i = 0; i < calendar.length; i++) {
        let calDate = new Date(Date.UTC(calendar[i].time.year, calendar[i].time.month, calendar[i].time.day, calendar[i].time.hour, calendar[i].time.minute));

        calendar[i].time.hour = calDate.getHours();
        calendar[i].time.minute = calDate.getMinutes();
        if (showDateCalendar.length === 0 || lastNewDay === -1 || (
            calDate.getFullYear() !== showDateCalendar[lastNewDay].year
            || calDate.getMonth() !== showDateCalendar[lastNewDay].month
            || calDate.getDate() !== showDateCalendar[lastNewDay].day
        )) {

            // Check for a weird time issue
            if (showDateCalendar.length !== 0 && ((calDate.getFullYear() < showDateCalendar[lastNewDay].year
                                                                            && calDate.getMonth() > showDateCalendar[lastNewDay].month
                                                                            && calDate.getDate() > showDateCalendar[lastNewDay].day)
                || (calDate.getMonth() < showDateCalendar[lastNewDay].month && calDate.getDate() > showDateCalendar[lastNewDay].day
                                                                            && calDate.getFullYear() === showDateCalendar[lastNewDay].year)
                || (calDate.getDate() < showDateCalendar[lastNewDay].day && calDate.getMonth() === showDateCalendar[lastNewDay].month
                                                                         && calDate.getFullYear() === showDateCalendar[lastNewDay].year))) {
                    // Skip if the date the show belongs to is out of range
                    if (showDateCalendar.length < 2) continue;
                    // Add the show to the previous day
                    showDateCalendar[showDateCalendar.length - 2].calendarItems.push(calendar[i]);
                    continue;
                }

            // Create a new ShowDate
            showDateCalendar.push({
                year: calDate.getFullYear(),
                month: calDate.getMonth(),
                day: calDate.getDate(),
                dayOfWeek: days[calDate.getDay()],
                calendarItems: [calendar[i]],
            });
            lastNewDay = showDateCalendar.length - 1;
        }
        else {
            // Add the calendar item to the last show date
            showDateCalendar[showDateCalendar.length - 1].calendarItems.push(calendar[i]);
        }
    }

    return showDateCalendar;
}