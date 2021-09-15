import React from "react";
import styled from "styled-components";
import UsdcIcon from "../../assets/usdc.svg";
import { breakpoints } from "../../constants/breakpoints";

const Container = styled.div`
  position: fixed;
  width: 300px;
  color: white;
  width: 100%;
  padding: 20px;
  top: 0px;
  background-color: #1b1b21;

  > span {
    font-size: 16px;
    color: #9e9fa6;
  }

  ${breakpoints.lg} {
    left: 5%;
    top: 50px;
    width: 300px;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;
const Currency = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > img {
    margin-right: 8px;
  }
`;

const Balance = ({ balance }) => {
  return (
    <Container>
      <span>Balance</span>
      <Row>
        <Currency>
          <img width="27px" height="27px" src={UsdcIcon} />
          USDC
        </Currency>
        <div>{Number(balance).toLocaleString()}</div>
      </Row>
    </Container>
  );
};

function areEqual(prevProps, nextProps) {
  if (prevProps.balance !== nextProps.balance) {
    return false;
  }

  return true;
}

export default React.memo(Balance, areEqual);
