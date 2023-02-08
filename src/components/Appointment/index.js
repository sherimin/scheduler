import "components/Appointment/styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


export default function Appointment(props) {

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";

    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {

        const interview = {
          student: name,
          interviewer
        };

        props.bookInterview(props.id, interview);
        transition(SHOW);
    }

    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
              <Show
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

        </article>
    );
}

