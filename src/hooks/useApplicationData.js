import { useState, useEffect } from "react"
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //console.log(state.day); //=> Monday

    //Return the total number of remaining spots on a specific day, by finding if the day of the appointment equals to a day in the db
    const interviewDay = state.days.find((day) => day.appointments.includes(id));
    //console.log(interviewDay.name); //=> Monday
    //console.log(interviewDay.spots); //=> 1

    //loop and deduct from total spots
    const spotsRemaining = state.days.map((day, index) => {
        //console.log('In spotsRemaining, ', state.appointments[id])
        //Get the number of appointments that are null
        if (interviewDay.name === state.day && state.appointments[id].interview === null) {
            return { ...day, spots: interviewDay.spots - 1}
        } else {
            return day;
        }
    })

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, spotsRemaining }))
      .catch(err => console.log('error in bookInterview, ', err));
  }


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const interviewDay = state.days.find((day) => day.appointments.includes(id));
    //loop and add 1 to spots
    const spotsRemaining = state.days.map((day, index) => {
        if (interviewDay.name === state.day) {
            return { ...day, spots: interviewDay.spots + 1}
        } else {
            return day;
        }
    })


    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, spotsRemaining }))
      .catch(err => console.log(err));
  };


  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((response) => setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
        )
    }, [])

    return { state, setDay, bookInterview, cancelInterview };

}