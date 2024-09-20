/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";

function CustomButton(props) {
  return (
    <Button
      className={`text-uppercase ${props.innerClass}`}
      variant={props.variant}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
}

export default CustomButton;
