import styled from "styled-components";

interface ButtonProps {
  color?: string;
  backgroundColor?: string;
}

const Button = styled.button<ButtonProps>`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 4px;
  height: 40px;
  padding: 0px 18px;
  border: none;
  margin: -8px;
  font-size: 14px;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  :hover {
    background: #eee;
  }
`;

Button.defaultProps = {
  color: "black",
  backgroundColor: "white",
};

export default Button;
