import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { savedata, updatedata } from "../redux/kakaomapSlice";
import { db } from "../shared/firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
const AddModal = ({
  setIsSearching,
  setIsOpenModal,
  info,
  updated,
  setUpdate,
}) => {
  const dispatch = useDispatch();
  const textRef = useRef();
  const [attachment, setAttachment] = useState();
  const [textarea, setTextArea] = useState(updated?.contents);
  console.log(updated.uuid);
  const submitHandler = (e) => {
    e.preventDefault();

    const contents = textRef.current.value;
    if (attachment == undefined) {
      setAttachment("");
    }
    console.log(attachment);
    const image = attachment;
    const uuid = uid();
    const obj = {
      place: info,
      contents: contents,
      imageUrl: image,
      uuid: uuid,
    };

    set(ref(db, `/${uuid}`), {
      placeData: obj,
      uuid: uuid,
    }).then(console.log("서버저장완료"));
    dispatch(savedata(obj));
    setIsOpenModal(false);
    setIsSearching(false);
  };
  const updateHandler = () => {
    const contents = textRef.current.value;
    const image = attachment;
    if (attachment == undefined) {
      setAttachment("");
    }
    const obj = {
      place: updated?.place,
      contents: contents,
      imageUrl: image,
      uuid: updated.uuid,
    };

    update(ref(db, `/${updated.uuid}`), {
      placeData: obj,
      uuid: updated.uuid,
    }).then(console.log("서버업데이트 완료"));
    dispatch(updatedata(obj));
    setIsOpenModal(false);
    setUpdate(() => []);
  };
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const cancelBtn = () => {
    setIsOpenModal(false);
    setUpdate(() => []);
  };
  const changeHandler = (e) => {
    setTextArea(e.target.value);
  };

  const onClearAttachment = () => {
    setAttachment(null);
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
          accept="image/*"
          name="file"
          onChange={onFileChange}
        />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
        {updated.length !== 0 ? (
          <button type="button" onClick={updateHandler}>
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
