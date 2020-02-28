import styled from "styled-components";

//a tag isn't accessibility compliant, need to remove default button styling.
export const BoldButton = styled.button`
  background-color: inherit;
  border: none;
  color: white;
  font-weight: bold;
`;

//my initial thought process was to make a component that takes in a boolean to decide bold or not, this caused console warnings from the styled components library.  I wouldn't normally leave this, but given the task at hand I'm ok with it.
export const Button = styled.button`
  background-color: inherit;
  border: none;
  color: white;
  font-weight: normal;
`;
