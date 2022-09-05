import { useRef, useState } from "react";
import styled from "styled-components";
import Map from "../api/Map";
import Mymap from "../api/Mymap";
import BackDrop from "./BackDrop";
import Modal from "./Modal";

const MapModal = ({ category }) => {
  const searchKeywordRef = useRef();
  const [keyword, setKeyword] = useState("");
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const searching = () => {
    setKeyword(searchKeywordRef.current.value);
    searchKeywordRef.current.value = "";
  };
  const openSearchHandler = () => {
    setIsOpenSearch((prev) => !prev);
  };
  const closeSearchHandler = () => {
    setIsOpenSearch((prev) => !prev);
  };
  return (
    <>
      <Section>
        <MapBox>
          <TitleBox>
            <h1>{category}</h1>
            <button onClick={openSearchHandler}>추가하기</button>
          </TitleBox>
          <Mymap />
        </MapBox>
        {isOpenSearch && (
          <>
            <BackDrop closeSearchHandler={closeSearchHandler} />
            <Modal>
              <DesSection>
                <Map
                  searchPlace={keyword}
                  closeSearchHandler={closeSearchHandler}
                />
                <FlexBox>
                  <h1>지도에서 찾아주세요</h1>
                  <input ref={searchKeywordRef} type="text" />
                  <button onClick={searching}>찾기</button>
                </FlexBox>
              </DesSection>
            </Modal>
          </>
        )}
      </Section>
    </>
  );
};
export default MapModal;

const Section = styled.section`
  margin: auto;
  min-width: 1200px;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const MapBox = styled.div`
  width: 700px;
  height: 650px;

  background-color: gray;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    background-color: white;
    height: 30px;
    width: 100px;
    &:hover {
      cursor: pointer;
      background-color: gray;
    }
  }
`;
const DesSection = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: gray;
  input {
    width: 300px;
    height: 50px;
  }
  button {
    margin: 10px;
    width: 30%;
    height: 30px;
  }
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
`;
