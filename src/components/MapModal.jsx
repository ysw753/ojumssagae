import { useRef, useState } from "react";
import styled from "styled-components";
import Map from "../api/Map";
import Mymap from "../api/Mymap";

const MapModal = ({ category }) => {
  const searchKeywordRef = useRef();
  const [keyword, setKeyword] = useState("");
  const searching = () => {
    setKeyword(searchKeywordRef.current.value);
    searchKeywordRef.current.value = "";
  };

  return (
    <>
      <Section>
        <MapBox>
          <p>{category}</p>
          <Map searchPlace={keyword} />
        </MapBox>
        <DesSection>
          <input ref={searchKeywordRef} type="text" />
          <button onClick={searching}>찾기</button>
        </DesSection>
      </Section>
      <Mymap />
    </>
  );
};
export default MapModal;

const Section = styled.section`
  min-width: 900px;
  display: flex;
`;
const MapBox = styled.div`
  width: 500px;
  height: 500px;

  background-color: gray;
`;
const DesSection = styled.div`
  width: 400px;
  height: 500px;

  background-color: gray;
`;
