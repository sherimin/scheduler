import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW: {
      let dayIndex = -1;
      const interviewDay = state.days.find((day, index) => {
        if (day.name === state.day) {
          dayIndex = index;
          return day;
        }
      });

      //loop over day.appointments to see if the slot is empty
      const spotsRemaining = (day) => {
        let output = 0;
        day.appointments.forEach((a) => {
          !action.appointments[a].interview && output++;
        });
        return output;
      };

      const updatedDay = {
        ...interviewDay,
        spots: spotsRemaining(interviewDay),
      };
      const days = state.days;
      days.splice(dayIndex, 1, updatedDay);

      return { ...state, appointments: action.appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      })
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
