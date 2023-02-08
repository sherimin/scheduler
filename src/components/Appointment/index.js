import "components/Appointment/styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";

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
          .catch(err => console.log(err))
    }

    function deleteAppointment() {
        transition(DELETING, true);
        props
          .cancelInterview(props.id)
          .then(() => transition(EMPTY))
          .catch(err => console.log('err in delete: ', err))
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
                onDelete = {() => transition(CONFIRM)}
                onEdit = {() => transition(EDIT)}
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
            {mode === DELETING && (
                <Status
                  message="Deleting..."
                />
            )}
            {mode === CONFIRM && (
                <Confirm 
                  message="Are you sure you would like to delete?"
                  onConfirm={deleteAppointment}
                  onCancel={back}
                />
            )}
            {mode === EDIT && (
                <Form
                  name={props.interview.student}
                  interviewer={props.interview.interviewer.id}
                  interviewers={props.interviewers}
                  onSave={save}
                  onCancel={back}
                />
            )}

        </article>
    );
}

