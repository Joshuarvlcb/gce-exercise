import React, { useState, useEffect } from "react";
/*
State
keep track of the date using a object

Input boxes
2 select
one text 

Event Listener
add a event listener to all input boxes to listen for any changes
event handler is going to be invoked when there is a change and will update the date from our state

Event Handler
this function will handle updating the state
it will accept a unit parameter and value

it will make sure that the date unit is valid more specifically the year unit
update the day state with the new date from the user


Local storage
I need to update cookies or localStorage in order to get the users newest date.
I am going to use a useEffect hook to determine if a user has previously entered a date in order to retrieve the newest date

Responsiveness
put all in boxes inside a container and make change the flex direction to column when the width of the screen is less than 500px

howManyDays
this function will calculate the difference of days from the user date with the current date


*/

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//manually creating an array with 31 items and each item is a integer from 1 until 31
const days = new Array(31).fill(0).map((_, i) => i + 1);

function App() {
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [text, setText] = useState("");
  useEffect(() => {
    /*
  if user has not entered a day we will update our date state to be the current date
  
  if the user has set a date we will get that dat from local storage and update our date state
  */
    const fullDate = new Date();
    if (localStorage.getItem("date")) {
      const usersDate = JSON.parse(localStorage.getItem("date"));
      setDate(usersDate);
      setText(usersDate.year);
      return;
    }
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();

    setDate({ day, month, year });
    setText(year);
  }, []);

  const updateDate = (unit, value) => {
    //?? error check for year unit
    if (unit == "year" && String(value).length < 4) return;
    localStorage.setItem("date", JSON.stringify({ ...date, [unit]: value }));
    setDate({ ...date, [unit]: value });
  };
  const howManyDays = () => {
    let usersDate = localStorage.getItem("date");
    if (!usersDate) {
      return 0;
    }
    usersDate = JSON.parse(usersDate);
    //Turning the dates into milliseconds in order to get the difference
    const currentDateMilliseconds = Date.now();
    const usersDateMilliseconds = Date.parse(
      `${usersDate.month} ${usersDate.day} ${usersDate.year}`
    );

    //I now got the difference in milliseconds and turned milliseconds into value that represents days
    // i multiplied 1000 to represent seconds then 60 to represent a minute then 60 to represent an hour
    //then 24 to represent a day

    const days =
      Math.floor(
        (usersDateMilliseconds - currentDateMilliseconds) / 1000 / 60 / 60 / 24
      ) + 1;
    return days;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="input-container">
          <label className="label" htmlFor="">
            Month
          </label>
          <select
            name="months"
            className="input"
            value={date.month - 1}
            onChange={(e) => {
              const month = e.target.value;
              updateDate("month", month);
            }}
          >
            {months.map((month, i) => {
              return (
                <option key={month} value={i}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input-container">
          <label className="label" htmlFor="">
            Day
          </label>
          <select
            value={date.day}
            name="days"
            className="input"
            onChange={(e) => {
              const day = e.target.value;
              updateDate("day", day);
            }}
          >
            {days.map((day) => {
              return (
                <option key={day} value={day}>
                  {day}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="" className="label">
            Year
          </label>
          <input
            value={text}
            type="text"
            className="input"
            onChange={(e) => {
              const year = e.target.value;
              setText(e.target.value);
              updateDate("year", year);
            }}
          />
        </div>
      </div>
      <div className="days">
        {/* get date from user is x days from now */}
        {`${date.month}/${date.day}/${
          date.year
        } is ${howManyDays()} days from now`}
      </div>
    </div>
  );
}

export default App;
