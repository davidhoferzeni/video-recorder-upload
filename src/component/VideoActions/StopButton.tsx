import React from "react";
import styled from "styled-components";

interface StopButtonProps {
  color?: string;
  backgroundColor?: string;
}

const Button = styled.button<StopButtonProps>`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background: rgba(227, 73, 28, 0.8);
  outline: none;
  border: none;
  cursor: pointer;
  margin: 20px;

  :hover {
    background: #fb6d42;
  }
`;

const Border = styled.div`
  background: rgba(255, 255, 255, 0.4);
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

Button.defaultProps = {
  color: "black",
  backgroundColor: "white",
};

const StopButton = ({ ...props }) => (
  <Border>
    <Button {...props} />
  </Border>
);

export default StopButton; 
