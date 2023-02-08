import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const bookInterview = (id, interview) => {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments }))
      .catch(err => console.log('error in bookInterview, ', err));

  }

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });


  useEffect(() => {


    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((response) => setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
        )
    }, [])

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
        bookInterview={bookInterview}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
       { schedule }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
