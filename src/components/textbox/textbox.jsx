/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";

function Textbox(props) {
  return (
    <div className={props.containerClass}>
      <Form.Label className="text-capitalize fw-bold" htmlFor={props.id}>
        {props.label}
      </Form.Label>
      <Form.Control
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onTextChange}
        size="lg"
      />
    </div>
  );
}

export default Textbox;
