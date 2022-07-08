import { useState, useEffect, useRef } from "react";

// Service Imports
import { getCalendar } from "../../services/api";

// Interface Imports
import { CalendarItem } from "../../interfaces/calendarItem";
import { ShowDate } from "../../interfaces/showDate";

// Constant Imports
import { days, months } from "../../constants/time";

// Component Imports
import Calendar from "../../components/Calendar";

export function IndexPage() {
    const [calendar, setCalendar] = useState<ShowDate[]>([]);
    const mounted = useRef<boolean>();

    useEffect(() => {
        getCalendar().then((calendar : CalendarItem[]) => {
            let showDateCalendar : ShowDate[] = [];

            for (let i = 0; i < calendar.length; i++) {
                let calDate = new Date(Date.UTC(calendar[i].time.year, calendar[i].time.month, calendar[i].time.day, calendar[i].time.hour, calendar[i].time.minute));
                calendar[i].time.hour = calDate.getHours();
                calendar[i].time.minute = calDate.getMinutes();
                if (showDateCalendar.length === 0 || (
                    calDate.getFullYear() !== showDateCalendar[showDateCalendar.length - 1].year
                    || calDate.getMonth() !== showDateCalendar[showDateCalendar.length - 1].month
                    || calDate.getDate() !== showDateCalendar[showDateCalendar.length - 1].day
                    )) 
                {
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
            setCalendar(showDateCalendar);
        });
    }, []);

    useEffect(() => {
        if (!mounted.current) mounted.current = true;
        else {
            console.log(document.getElementById(months[new Date().getMonth()] + new Date().getDate()));
            document.getElementById(months[new Date().getMonth()] + new Date().getDate())?.scrollIntoView();
        }
    });


    return (
      <section id="index-page" className="section page">
        <header>
            <h1>AniDub Schedule</h1>
            <p>(AniList integration coming soon!)</p>
        </header>
        <Calendar calendar = {calendar}></Calendar>
        {/*<div>
                <h2>Test Images </h2>
                <div>
                    <p>{ (funimation as StreamingService).name }</p>
                    <img src = {(funimation as StreamingService).image} alt = "Funimation" />
                </div>
                <div>
                    <p>{ (crunchyroll as StreamingService).name }</p>
                    <img src = {(crunchyroll as StreamingService).image} alt = "Crunchyroll" />
                </div>
                <div>
                    <p>{ (hidive as StreamingService).name }</p>
                    <img src = {(hidive as StreamingService).image} alt = "HiDive" />
                </div>
                <div>
                    <p>{ (netflix as StreamingService).name }</p>
                    <img src = {(netflix as StreamingService).image} alt = "Netflix" />
                </div>
            </div>
    */}
    <footer><p>
        Created by taliyos/Charles Reverand. View on <a href = "https://github.com/taliyos/Anime-Dub-Schedule-React">GitHub</a></p></footer>
      </section>
    );
  }