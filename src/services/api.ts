const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://192.168.1.4:3001";

let startAmount = 0;

// Sends a GET request to the backend-server for the latest calendar
export async function getCalendar(startDateAmount: number = 7) {
    if (startAmount === startDateAmount) return;
    startAmount = startDateAmount;
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - startDateAmount);
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    const response = await fetch(API_BASE_URL + "/calendar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify ({
            "startDate": startDate.toUTCString(),
            "endDate": endDate.toUTCString()
        })
    });

    const data = await response.json();

    return data;
}