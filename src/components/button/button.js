import styled from "styled-components";

const Container = styled.div`
  margin-top: 32px;
  margin-bottom: 24px;
  width: calc(50% - 8px);
  padding: 1px;
  border-radius: 8px;
  background-image: ${({ defi }) =>
    defi == "aave"
      ? "linear-gradient(258deg,rgb(182, 80, 158),rgb(46, 186, 198))"
      : defi == "compound"
      ? "linear-gradient(76deg,rgb(46, 159, 154),rgb(0, 211, 149) 96%)"
      : "linear-gradient(258deg, rgb(0, 15, 255), rgb(52, 101, 164) 96%)"};
`;
const Button = styled.button`
  height: 32px;
  border-radius: 8px;

  border: none;
  transition: 200ms;
  outline: none;
  color: white;
  cursor: pointer;
  width: 100%;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0)" : "#232535"};
`;

const CustomButton = ({ title, onClick, defi, isActive = false }) => {
  return (
    <Container defi={defi}>
      <Button isActive={isActive} onClick={onClick}>
        {title}
      </Button>
    </Container>
  );
};

export default CustomButton;
