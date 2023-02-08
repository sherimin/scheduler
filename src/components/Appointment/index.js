import "components/Appointment/styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";


export default function Appointment(props) {
    console.log('props in appt: ', props);

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING"

    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {

        const interview = {
          student: name,
          interviewer
        };

        transition(SAVING);

        props
          .bookInterview(props.id, interview)
          .then(() => transition(SHOW))
          .catch(err => console.log('err in appt: ', err))

    }

    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
              <Show
                id={props.id}
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onCancel = {back}
              />
            )}
            {mode === CREATE && (
                <Form 
                  interviewer={props.interview?.interviewer ?? ''}
                  interviewers={props.interviewers}
                  onCancel = {back}
                  onSave = {save}
                />
            )}
            {mode === SAVING && (
                <Status
                  message="Saving..."
                />
            )}

        </article>
    );
}

