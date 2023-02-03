export function getAppointmentsForDay(state, day) {

    let output = [];

    for (const eachDay of state.days) {
        if (eachDay.name === day) {
            for (const eachApp of eachDay.appointments) {
                if (state.appointments[eachApp]) {
                    output.push(state.appointments[eachApp])
                }
            }
        }
    }
    return output;
}