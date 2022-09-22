import { useState } from "react";

import SearchMap from "../api/Searchmap";
import AddModal from "../components/AddModal";
import styled from "styled-components";
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [place, setPlace] = useState();
  const savefnc = (place) => {
    setOpenModal(true);
    setPlace(place);
  };
  return (
    <All>
      <SearchMap savefnc={savefnc} key={1} />
      {openModal && <AddModal place={place} setOpenModal={setOpenModal} />}
    </All>
  );
};
export default Home;
const All = styled.div`
  background-color: #fafaf9;
  height: 120vh;
`;
