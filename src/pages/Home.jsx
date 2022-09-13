import { useRef, useState } from "react";
import { useEffect } from "react";
import SavedMap from "../api/SavedMap";
import SearchMap from "../api/Searchmap";
import AddModal from "../components/AddModal";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [place, setPlace] = useState();
  const savefnc = (place) => {
    setOpenModal(true);
    setPlace(place);
  };
  return (
    <>
      <SearchMap savefnc={savefnc} />
      <h1>추억이 저장된 공간</h1>
      <SavedMap />
      {openModal && <AddModal place={place} setOpenModal={setOpenModal} />}
    </>
  );
};
export default Home;
