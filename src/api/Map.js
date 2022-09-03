import React, { useEffect } from "react";
import { savedata } from "../redux/kakaomapSlice";
import { useDispatch } from "react-redux/es/exports";
const { kakao } = window;

const Map = ({ searchPlace }) => {
  const dispatch = useDispatch();

  const saveBtn = (place) => {
    const address = place.address_name;
    dispatch(savedata(address));
    console.log(address);
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
        console.log(place);

        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            `<button type="button" id="clickMe">저장</button>` +
            "</div>"
        );
        infowindow.open(map, marker);
        document.getElementById("clickMe").onclick = () => saveBtn(place);
      });
    }
  }, [searchPlace]);

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Map;
