/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";

function Dropdown(props) {
  return (
    <div className={props.containerClass}>
      <Form.Select
        className="text-capitalize"
        size="lg"
        onChange={props.onSelectChange}
      >
        <option value="">{`select ${props.label}`}</option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default Dropdown;
