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
};


export function getInterview(state, interview) {

    let output = {};

    if (interview) {
        output["student"] = interview.student;
        output["interviewer"] = state.interviewers[interview.interviewer];
    } else {
        return null;
    }
    return output;
}

export function getInterviewersForDay(state, day) {
    let output = [];

    for (const eachDay of state.days) {
        //console.log(eachDay);
        if (eachDay.name === day) {
            for (const appointment of eachDay.interviewers) {
                if (state.interviewers[appointment]) {
                    //console.log('appointment : ', state.interviewers[appointment])
                    output.push(state.interviewers[appointment])
                }
            }
        }
    }
    return output;
}
