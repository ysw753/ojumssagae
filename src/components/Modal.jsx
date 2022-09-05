import styled from "styled-components";

const Modal = (props) => {
  return <ModalBox>{props.children}</ModalBox>;
};
export default Modal;

const ModalBox = styled.div`
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  @media (min-width: 768px) {
    & {
      left: calc(50% - 30rem);
      width: 60rem;
    }
  }
`;
