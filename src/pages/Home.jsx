import { useRef, useState } from "react";
import { useEffect } from "react";
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
      <SearchMap savefnc={savefnc} key={1} />
      {openModal && <AddModal place={place} setOpenModal={setOpenModal} />}
    </>
  );
};
export default Home;
