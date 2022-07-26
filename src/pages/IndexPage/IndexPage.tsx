import { useState, useEffect, useRef } from "react";

// Service Imports
import { getCalendar } from "../../services/api";

// Interface Imports
import { CalendarItem } from "../../interfaces/calendarItem";
import { ShowDate } from "../../interfaces/showDate";

// Constant Imports
import { months } from "../../constants/time";

// Component Imports
import Calendar from "../../components/Calendar";
import { processCalendar } from "../../services/processCalendar";

function jumpToToday() {
    document.getElementById(months[new Date().getMonth()] + new Date().getDate())?.scrollIntoView();
}

export function IndexPage() {
    const [calendar, setCalendar] = useState<ShowDate[]>([]);
    const [hasRun, setHasRun] = useState<boolean>(false);
    const mounted = useRef<boolean>();

    useEffect(() => {
        getCalendarTime(7);
    }, []);

    useEffect(() => {
        if (hasRun) return;
        if (!mounted.current) mounted.current = true;
        else {
            jumpToToday();
            setHasRun(true);
        }
    }, [hasRun]);

    function getCalendarTime(selection : number) {
        getCalendar(selection).then((calendar : CalendarItem[]) => {
            setCalendar(processCalendar(calendar));
        });
    }

    return (
      <section id="index-page" className="section page">
        <header>
            <div className = "title">
                <h1>AniDub Schedule</h1>
                <p>(AniList integration coming soon!)</p>
            </div>
            <div className = "dateSelectors">
                {hasRun ? (<input onClick = {() => { getCalendarTime(7); }} type="radio" id="7" value="7" name="date"/>) : (<input checked onClick = {() => { getCalendarTime(7); }} type="radio" id="7" value="7" name="date"/>)}
                <label htmlFor = "7">Last 7 days</label>
                <input onClick = {() => { getCalendarTime(14); }} type="radio" id="14" value="14" name="date"/><label htmlFor = "14">Last 14 days</label>
                <input onClick = {() => { getCalendarTime(30); }} type="radio" id="30" value="30" name="date"/><label htmlFor = "30">Last 30 days</label>
            </div>
            <div className = "today">
                <button onClick = {() => { jumpToToday(); }}>Jump to Today</button>
            </div>
        </header>
        <Calendar calendar = {calendar}></Calendar>
    <div className = "goTo today">
        <button onClick = {() => { jumpToToday(); }}>Jump to Today</button>
    </div>
    <footer>
        <div>
            <p>Created by taliyos/Charles Reverand. View on <a href = "https://github.com/taliyos/Anime-Dub-Schedule-React">GitHub</a></p>
        </div>
        <div>
            <p>Calendar information from <a href = "https://teamup.com/ksdhpfjcouprnauwda">Comprehensive Anime Dubs Release Calendar</a></p>
        </div>
    </footer>
      </section>
    );
  }