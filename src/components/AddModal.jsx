import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { savedata } from "../redux/kakaomapSlice";

const AddModal = ({ clickedPlace, closeAddModal }) => {
  const textRef = useRef();
  console.log(clickedPlace);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const contents = textRef.current.value;

    const obj = { place: clickedPlace, contents: contents };
    dispatch(savedata(obj));
    closeAddModal();
  };

  return (
    <Form onSubmit={submitHandler}>
      <h1>추억을 저장해주세요!</h1>
      <textarea ref={textRef} placeholder="메모" />
      <button type="submit">저장하기</button>
    </Form>
  );
};
export default AddModal;

const Form = styled.form`
  position: absolute;
  z-index: 200;
  top: 0px;
  right: 0px;
  width: 310px;
  height: 100%;
  background-color: yellow;
  textarea {
    width: 100%;
    height: 60%;
    resize: none;
  }
`;