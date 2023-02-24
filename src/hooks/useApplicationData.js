import { useEffect, useReducer } from "react"
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {

    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        const interviewDay = state.days.filter((day) => day.name === state.day)

      const spotsRemaining = day => {
        let output;
        day.appointments.forEach(a => {
          (!action.appointments[a].interview && output++)
        })
        return output;
      }

      const updatedDay = { ...interviewDay[0], spots: spotsRemaining(interviewDay[0])};
      const interviewDayId = state.days.indexOf(interviewDay[0]);
      const days = [...state.days.slice(0, interviewDayId), updatedDay, ...state.days.slice( interviewDay + 1, state.days.length )];

      return { ...state, appointments: action.appointments, days }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });



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
      .put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }))
  };


  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }));
  };


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((response) => dispatch(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
        )
    }, [])

    return { state, setDay, bookInterview, cancelInterview };

}