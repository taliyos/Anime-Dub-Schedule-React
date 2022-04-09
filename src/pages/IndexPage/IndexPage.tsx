import { useState, useEffect } from "react";

// Service Imports
import { getCalendar } from "../../services/api";

// Interface Imports
import { ShowDate } from "../../interfaces/showDate";
import { StreamingService } from "../../interfaces/streamingService";

// Constant Imports
import funimation from "../../constants/StreamingServices/funimation.json";
import crunchyroll from "../../constants/StreamingServices/crunchyroll.json";
import hidive from "../../constants/StreamingServices/hidive.json";
import netflix from "../../constants/StreamingServices/netflix.json";

export function IndexPage() {
    const [calendar, setCalendar] = useState<ShowDate[]>([]);

    useEffect(() => {
        getCalendar().then((cal : ShowDate[]) => setCalendar(cal));
    }, []);


    return (
      <section id="index-page" className="section page">
        <header>
            <h1>AniDub Schedule</h1>
            
        </header>
        <div className = "showSection">
            { calendar?.map( (data) => (
                <div>

                </div>
            ))}
            <div>
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
        </div>
      </section>
    );
  }