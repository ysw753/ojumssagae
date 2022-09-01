import styled from "styled-components";
import Map from "../api/Map";

const MapModal = ({ category }) => {
  return (
    <MapBox>
      <p>{category}</p>
      <Map />
    </MapBox>
  );
};
export default MapModal;

const MapBox = styled.div`
  width: 500px;
  height: 500px;

  background-color: gray;
`;
