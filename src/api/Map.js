import React, { useEffect, useState } from "react";
import { saveContents, saveplace, savedata } from "../redux/kakaomapSlice";
import { useDispatch } from "react-redux/es/exports";
import "./Map.css";
import AddModal from "../components/AddModal";
const { kakao } = window;

const Map = ({ searchPlace, closeSearchHandler }) => {
  const [record, setRecord] = useState(false);
  const dispatch = useDispatch();
  const [clickedPlace, setClicekedPlace] = useState();
  const recordBtn = (place) => {
    setRecord(true);
    console.log(place);
    setClicekedPlace(place);
  };
  const closeAddModal = () => {
    if (window.confirm("저장하시겠습니까?")) {
      setRecord(false);
      closeSearchHandler();
    }
  };

  useEffect(() => {
    const container = document.getElementById("map");
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출

        infowindow.setContent(
          '<div id="infoBox" style="padding:5px;font-size:12px; display:flex;">' +
            place.place_name +
            `<button type="button" id="clickMe" style="width:60px; ">기록</button>` +
            "</div>"
        );
        infowindow.open(map, marker);
        document.getElementById("clickMe").onclick = () => recordBtn(place);
      });
    }
  }, [searchPlace]);

  return (
    <div style={{ postion: "relative" }}>
      <div id="map" style={{ width: "650px", height: "650px" }}></div>
      {record && (
        <AddModal clickedPlace={clickedPlace} closeAddModal={closeAddModal} />
      )}
    </div>
  );
};

export default Map;
