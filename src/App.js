import styled from "styled-components";
import CustomButton from "./components/button/button";
import Card from "./components/card/card";
import { useState, useCallback } from "react";
import Balance from "./components/balance/balance";
import { breakpoints } from "./constants/breakpoints";
import TimeTravel from "./components/time-travel/time-travel";

const Container = styled.div`
  padding: 240px 6%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  ${breakpoints.lg} {
    padding: 20% 6%;
  }
  ${breakpoints.vlg} {
    padding: 12% 6%;
  }
`;

function App() {
  const [balance, setBalance] = useState(40000);
  const [isAaveOnDeposit, setAaveOnDeposit] = useState(true);
  const [isCompoundOnDeposit, setCompoundOnDeposit] = useState(true);
  const [isCurveOnDeposit, setCurveOnDeposit] = useState(true);
  const [compound, setCompound] = useState({
    apy: 5,
    deposited: 0,
    intrest: 0,
  });
  const [aave, setAave] = useState({
    apy: 3,
    deposited: 0,
    intrest: 0,
  });
  const [curve, setCurve] = useState({
    apy: 2.5,
    deposited: 0,
    intrest: 0,
  });
  const allCurrency = {
    aave: {
      set: setAave,
      value: aave,
    },
    compound: {
      set: setCompound,
      value: compound,
    },
    curve: {
      set: setCurve,
      value: curve,
    },
  };
  const deposit = (defi, amount) => {
    if (amount > balance) {
      //show error
    } else {
      let remained = balance - amount;
      let depoAmount = allCurrency[defi].value.deposited + amount;
      allCurrency[defi].set((value) => ({
        ...value,
        deposited: depoAmount,
      }));
      setBalance(remained);
    }
  };
  const withdraw = (defi, amount) => {
    let deposited = allCurrency[defi].value.deposited;
    let intrest = allCurrency[defi].value.intrest;
    let balanceInDefi = deposited + intrest;
    if (amount > balanceInDefi) {
      //show error
    } else {
      let newBalance = balance + amount;
      if (amount > intrest) {
        allCurrency[defi].set((value) => ({
          ...value,
          deposited: balanceInDefi - amount,
          intrest: 0,
        }));
      } else {
        allCurrency[defi].set((value) => ({
          ...value,
          intrest: intrest - amount,
        }));
      }
      setBalance(newBalance);
    }
  };
  const handleTimeTravel = (days) => {
    Object.keys(allCurrency).map((el) => {
      let allvalue =
        allCurrency[el].value.deposited + allCurrency[el].value.intrest;
      if (!allvalue == 0) {
        let dpy = (allCurrency[el].value.apy / 100 / 365) * days;
        let intrest = dpy * allvalue;
        let newIntrest = intrest + allCurrency[el].value.intrest;

        allCurrency[el].set((value) => ({
          ...value,
          intrest: newIntrest,
        }));
      }
    });
  };
  return (
    <Container>
      <Balance balance={balance} />
      <TimeTravel handleTimeTravel={handleTimeTravel} />
      <Card
        isOnDeposit={isCompoundOnDeposit}
        setOnDeposit={setCompoundOnDeposit}
        accruedIntrest={compound.intrest}
        amountDeposit={compound.deposited}
        apy={compound.apy}
        defi="compound"
        withdraw={withdraw}
        deposit={deposit}
      />
      <Card
        isOnDeposit={isAaveOnDeposit}
        setOnDeposit={setAaveOnDeposit}
        accruedIntrest={aave.intrest}
        amountDeposit={aave.deposited}
        apy={aave.apy}
        defi="aave"
        withdraw={withdraw}
        deposit={deposit}
      />
      <Card
        isOnDeposit={isCurveOnDeposit}
        setOnDeposit={setCurveOnDeposit}
        accruedIntrest={curve.intrest}
        amountDeposit={curve.deposited}
        apy={curve.apy}
        withdraw={withdraw}
        deposit={deposit}
        defi="curve"
      />
    </Container>
  );
}

export default App;
