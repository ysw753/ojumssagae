import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
const { kakao } = window;

const Mymap = () => {
  const placeArr = useSelector((state) => {
    return state.place.value;
  });
  console.log(placeArr);
  const saveBtn = () => {
    console.log("저장된 지역을 보여주세요");
  };

  useEffect(() => {
    const container = document.getElementById("mymap");
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    function places(placeArr) {
      for (let i = 0; i < placeArr.length; i++) {
        displayMarker(placeArr[i]);
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
            "</div>"
        );
        infowindow.open(map, marker);
        document.getElementById("clickMe").onclick = () => saveBtn(place);
      });
    }
    places(placeArr);
  }, [placeArr]);

  return (
    <div>
      <div id="mymap" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Mymap;
