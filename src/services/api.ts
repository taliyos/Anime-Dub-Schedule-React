const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Sends a GET request to the backend-server for the latest calendar
export async function getCalendar() {
    const response = await fetch(API_BASE_URL + "/calendar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data;
}