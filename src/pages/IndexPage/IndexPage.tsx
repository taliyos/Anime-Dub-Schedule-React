import { useState } from "react";

// Service imports
import { getCalendar } from "../../services/api";
import { ShowDate } from "../../interfaces/showDate";

export function IndexPage() {
    const [run, setRun] = useState(false);

    let calendar : ShowDate[] = [];

    async function retrieveCalendar() {
        calendar = await getCalendar();
        setRun(true);
    }

    retrieveCalendar();

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
        </div>
      </section>
    );
  }