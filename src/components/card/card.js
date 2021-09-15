import React, { useState } from "react";
import styled from "styled-components";
import AvveIcon from "../../assets/aave.svg";
import CompoundIcon from "../../assets/compound.svg";
import CurveIcon from "../../assets/curve.svg";
import UsdcIcon from "../../assets/usdc.svg";
import CustomButton from "../button/button";

const Container = styled.div`
  width: 25%;
  min-width: 360px;
  background-color: #232535;
  border-radius: 8px;
  margin-bottom: 24px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: 300;
  text-transform: capitalize;

  > img {
    margin-right: 8px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-top: 16px;
`;
const AmountInput = styled.input`
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

  :focus {
    border-bottom: solid 1px #fff;
  }
`;
const AmountText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > img {
    margin-right: 8px;
  }
`;
const InnerCard = styled.div`
  padding: 16px;
`;
const PriceSpan = styled.span`
  font-size: 12px;
  color: #9e9fa6;
`;
const ConfirmButton = styled.button`
  width: 100%;
  border-radius: 0 0 8px 8px;
  border: none;
  outline: none;
  height: 50px;
  background-color: #3a3e5b;
  border-top: solid 1px #666;
  font-size: 18px;
  margin-top: 32px;
  color: white;
  cursor: pointer;

  :disabled {
    background-color: rgba(0, 0, 0, 0);
    color: #9e9fa6;
  }
`;

const DEFI_IMAGES = {
  aave: AvveIcon,
  compound: CompoundIcon,
  curve: CurveIcon,
};

const Card = ({
  isOnDeposit,
  setOnDeposit,
  defi,
  accruedIntrest,
  amountDeposit,
  apy,
  withdraw,
  deposit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  const handleConfirmClick = () => {
    if (isOnDeposit) {
      deposit(defi, parseInt(inputValue));
    } else {
      withdraw(defi, parseInt(inputValue));
    }
  };
  return (
    <Container>
      <InnerCard>
        <TitleContainer>
          <img width="15px" height="22px" src={DEFI_IMAGES[defi]} />
          {defi}
        </TitleContainer>
        <DataContainer>
          <div>Current APY:</div>
          <div>{apy}%</div>
        </DataContainer>
        <DataContainer>
          <div>Amount Deposited:</div>
          <div>
            {Number(amountDeposit).toFixed(4).toLocaleString()} <PriceSpan>USDC</PriceSpan>
          </div>
        </DataContainer>
        <DataContainer>
          <div>Accrued Intrest:</div>
          <div>
            {Number(accruedIntrest).toFixed(4).toLocaleString()}{" "}
            <PriceSpan>USDC</PriceSpan>
          </div>
        </DataContainer>
        <ButtonContainer>
          <CustomButton
            isActive={!isOnDeposit}
            title="Withdraw"
            defi={defi}
            onClick={() => setOnDeposit(false)}
          />
          <CustomButton
            isActive={isOnDeposit}
            title="Deposit"
            defi={defi}
            onClick={() => setOnDeposit(true)}
          />
        </ButtonContainer>
        <DataContainer>
          <AmountText>
            <img width="22px" height="22px" src={UsdcIcon} /> Amount:
          </AmountText>
          <AmountInput
            value={inputValue}
            onChange={handleInputChange}
            placeholder="300"
          />
        </DataContainer>
      </InnerCard>
      <ConfirmButton
        disabled={inputValue.length === 0}
        onClick={handleConfirmClick}
      >
        Confirm
      </ConfirmButton>
    </Container>
  );
};

function areEqual(prevProps, nextProps) {
  if (prevProps.isOnDeposit !== nextProps.isOnDeposit) {
    return false;
  }
  if (prevProps.accruedIntrest !== nextProps.accruedIntrest) {
    return false;
  }
  if (prevProps.amountDeposit !== nextProps.amountDeposit) {
    return false;
  }
  if (prevProps.deposit !== nextProps.deposit) {
    return false;
  }
  if (prevProps.withdraw !== nextProps.withdraw) {
    return false;
  }

  return true;
}

export default React.memo(Card, areEqual);
