import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { savedata, updatedata } from "../redux/kakaomapSlice";

const AddModal = ({
  setIsSearching,
  setIsOpenModal,
  info,
  update,
  setUpdate,
}) => {
  console.log(update);
  const dispatch = useDispatch();
  const textRef = useRef();
  const [myImages, setMyImages] = useState([]);
  const [url, setUrl] = useState();
  const [textarea, setTextArea] = useState(update?.contents);

  const submitHandler = (e) => {
    e.preventDefault();

    const contents = textRef.current.value;

    const obj = { place: info, contents: contents };

    dispatch(savedata(obj));
    setIsOpenModal(false);
    setIsSearching(false);
    console.log(obj);
  };
  const updateHandler = () => {
    const contents = textRef.current.value;
    const obj = { place: update?.place, contents: contents };
    dispatch(updatedata(obj));
    setIsOpenModal(false);
    setUpdate(() => []);
  };
  const onLoadFile = (e) => {
    setMyImages(e.target.files);
  };
  const cancelBtn = () => {
    setIsOpenModal(false);
    setUpdate(() => []);
  };
  const changeHandler = (e) => {
    setTextArea(e.target.value);
  };
  return (
    <>
      <Form onSubmit={submitHandler}>
        <h1>추억을 저장해주세요!</h1>
        <textarea
          ref={textRef}
          placeholder={!info && "추억을 저장해주세요!"}
          onChange={changeHandler}
          value={textarea}
        />
        <input
          type="file"
          accept="img/*"
          multiple
          name="file"
          onChange={onLoadFile}
        />
        {update.length !== 0 ? (
          <button type="submit" onClick={updateHandler}>
            수정하기
          </button>
        ) : (
          <button type="submit">저장하기</button>
        )}

        <button type="button" onClick={cancelBtn}>
          취소하기
        </button>
      </Form>
    </>
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
