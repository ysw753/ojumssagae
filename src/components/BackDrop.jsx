import styled from "styled-components";

const BackDrop = ({ closeSearchHandler }) => {
  return <Back onClick={closeSearchHandler} />;
};
export default BackDrop;

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;
