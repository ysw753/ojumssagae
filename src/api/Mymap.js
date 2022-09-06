import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { deletedata } from "../redux/kakaomapSlice";
const { kakao } = window;

const Mymap = () => {
  const dispatch = useDispatch();
  const placeArr = useSelector((state) => {
    return state.place.value;
  });
  console.log(placeArr);

  const deleteBtn = (place) => {
    console.log("delete");
    const id = place.id;
    dispatch(deletedata(id));
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
        displayMarker(placeArr[i].place, placeArr[i].contents);
        console.log(placeArr[i]);
      }
    }

    function displayMarker(place, contents) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        console.log(place);

        infowindow.setContent(
          `
          <div style="padding:5px;font-size:12px;"> ${place.place_name}</div> 
            <div style="word-break:break-all; overflow:auto; display: table; ">${contents}</div>
            <button id="update">수정</button>
            <button id="${place.id}">삭제</button>
            `
        );
        infowindow.open(map, marker);
        //document.getElementById("delete").onclick = () => deleteBtn(place);
        document
          .getElementById(place.id)
          .addEventListener("click", () => deleteBtn(place));
      });
    }

    places(placeArr);
  }, [placeArr]);

  return (
    <div>
      <div id="mymap" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default Mymap;
