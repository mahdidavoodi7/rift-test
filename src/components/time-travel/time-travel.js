import { useState } from "react";
import styled from "styled-components";
import UsdcIcon from "../../assets/usdc.svg";
import { breakpoints } from "../../constants/breakpoints";

const Container = styled.div`
  position: fixed;
  top: 100px;
  width: 100%;
  color: white;
  padding: 20px;
  background-color: #1b1b21;

  > div:first-child {
    width: 100%;
    font-size: 16px;
    color: #9e9fa6;
    text-align: left;
  }

  ${breakpoints.lg} {
    right: 5%;
    top: 50px;
    width: 300px;

    > div:first-child {
      width: 100%;
      font-size: 16px;
      color: #9e9fa6;
      text-align: right;
    }
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;
const Button = styled.button`
  background-color: #232535;
  color: white;
  border: solid 1px #666;
  font-size: 16px;
  padding: 4px 30px;
  cursor: pointer;
  border-radius: 8px;
`;
const Input = styled.input`
  width: 60%;
  border: none;
  border-bottom: solid 1px #444;
  outline: none;
  background-color: transparent;
  transition: 300ms;
  caret-color: white;
  padding-bottom: 4px;
  text-align: right;
  font-size: 18px;
  color: white;
  direction: rtl;
  :focus {
    border-bottom: solid 1px #fff;
  }
`;

const TimeTravel = ({ handleTimeTravel }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  return (
    <Container>
      <div>Time Travel</div>
      <Row>
        <Button onClick={() => handleTimeTravel(parseInt(inputValue))}>
          Go
        </Button>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Days"
        />
      </Row>
    </Container>
  );
};

export default TimeTravel;
