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

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments }))
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

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }))
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