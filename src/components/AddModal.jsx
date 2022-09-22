import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../shared/firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
const AddModal = ({
  setIsSearching,
  setIsOpenModal,
  info,
  updated,
  setUpdate,
  setPlaceArr,
}) => {
  const textRef = useRef();
  const [attachment, setAttachment] = useState([]);
  const [textarea, setTextArea] = useState(updated?.contents);
  const [getPropImg, setGetPropImg] = useState([]);

  useEffect(() => {
    if (updated.imageUrl === undefined) {
      setGetPropImg([]);
    } else {
      setGetPropImg(updated.imageUrl);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const contents = textRef.current.value;

    const image = attachment;
    const uuid = uid();
    const placeData = {
      place: info,
      contents: contents.replace(/(?:\r\n|\r|\n)/g, "<br/>"),
      imageUrl: image,
      uuid: uuid,
    };

    set(ref(db, `/${uuid}`), {
      placeData,
    }).then(console.log("서버저장완료"));

    setPlaceArr((prev) => [...prev, placeData]);
    setIsOpenModal(false);
    setIsSearching(false);
  };
  const onClearGetPropImg = () => {
    setGetPropImg([]);
  };
  const updateHandler = () => {
    let image = [];
    if (attachment.length === 0) {
      image = [];
      setAttachment([]);
    }
    if (attachment.length === 0 && getPropImg.length !== 0) {
      image = updated.imageUrl;
    }
    const contents = textRef.current.value;

    const obj = {
      place: updated?.place,
      contents: contents.replace(/(?:\r\n|\r|\n)/g, "<br/>"),

      imageUrl: attachment.length !== 0 ? attachment : image,
      uuid: updated.uuid,
    };

    update(ref(db, `/${updated.uuid}`), {
      placeData: obj,
    }).then(console.log("서버업데이트 완료"));
    //dispatch(updatedata(obj));
    setIsOpenModal(false);
    setUpdate(() => []);
    setPlaceArr((prev) => {
      const arr = prev.map((i) => {
        if (i.uuid === updated.uuid) {
          i.placeData = obj;
          return i;
        } else {
          return i;
        }
      });
      return arr;
    });
  };

  const onFileChange = (event) => {
    const fileArr = event.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 5 ? 5 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setAttachment([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };
  const cancelBtn = () => {
    setIsOpenModal(false);
    setUpdate(() => []);
  };
  const changeHandler = (e) => {
    setTextArea(e.target.value);
  };

  const onClearAttachment = () => {
    setAttachment(() => []);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <h1>추억을 저장해주세요!</h1>
        <textarea
          rows="2"
          cols="20"
          wrap="hard"
          ref={textRef}
          onChange={changeHandler}
          value={textarea.split("<br/>").join("\n")}
        />
        <label htmlFor="file">
          <div className="btn-upload">사진올리기</div>
        </label>
        <input
          type="file"
          accept="image/*"
          name="file"
          id="file"
          multiple
          onChange={onFileChange}
        />
        {attachment.length !== 0 && (
          <ThumBox>
            {attachment.map((attach) => (
              <img src={attach} width="50px" height="50px" alt="x" />
            ))}

            <button onClick={onClearAttachment}>Clear</button>
          </ThumBox>
        )}
        {attachment.length === 0 && getPropImg.length !== 0 && (
          <>
            <ThumBox>
              {getPropImg.map((i) => (
                <img src={i} width="50px" height="50px" alt="x" />
              ))}

              <button onClick={onClearGetPropImg}>Clear</button>
            </ThumBox>
          </>
        )}

        <button type="button" onClick={cancelBtn}>
          취소하기
        </button>
        {updated.length !== 0 ? (
          <button type="button" onClick={updateHandler}>
            수정하기
          </button>
        ) : (
          <button type="submit">저장하기</button>
        )}
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
  background-color: white;
  border: 2px solid #fdcb6e;
  textarea {
    width: 90%;
    margin-left: 10px;
    height: 50%;
    resize: none;
    border: none;
    border: 1px solid #fdcb6e;
    &:focus {
      outline-color: #fdcb6e;
    }
  }
  .btn-upload {
    width: 100px;
    height: 30px;
    margin: 10px;
    background: #fff;
    border: 2px solid #fdcb6e;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #fab1a0;
      color: #fff;
    }
  }

  #file {
    display: none;
  }
  button {
    background-color: white;
    border-radius: 5px;
    font-family: Dongle;
    font-size: 26px;
    width: 100px;
    height: 40px;
    border: 2px solid #fdcb6e;
    margin-left: 10px;
    &:hover {
      background-color: #fab1a0;
      cursor: pointer;
      color: #fff;
    }
  }
  img {
    margin-left: 10px;
  }
`;
const ThumBox = styled.div`
  align-items: center;
  width: 300px;
  margin: 5px;
  button {
    height: 30px;
  }
`;
