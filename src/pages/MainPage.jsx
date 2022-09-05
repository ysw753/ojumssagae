import { useState } from "react";
import styled from "styled-components";
import CategorySection from "../components/CategorySection";
import Header from "../components/Header";
import MapModal from "../components/MapModal";
import ViewSection from "../components/ViewSection";

const MainPage = () => {
  const [category, setCategory] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const selectedViewHandler = (food) => {
    setCategory(food);
    setIsOpenModal(true);
  };
  return (
    <Window>
      <Header />
      <CategorySection selectedViewHandler={selectedViewHandler} />
      <ViewSection category={category} />
      <View>
        {isOpenModal ? (
          <MapModal category={category} />
        ) : (
          <p>what do you want it?</p>
        )}
      </View>
    </Window>
  );
};

export default MainPage;
const Window = styled.div`
  min-width: 1200px;
`;

const View = styled.div`
  width: 100%;
  margin: auto;
`;
