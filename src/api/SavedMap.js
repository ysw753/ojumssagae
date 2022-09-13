import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";

const { kakao } = window;

const SavedMap = () => {
  return null;
  // const placeArr = useSelector((state) => {
  //   return state.place.value;
  // });
  // return (
  //   <Map // 지도를 표시할 Container
  //     center={{
  //       // 지도의 중심좌표
  //       lat: 37.48492,
  //       lng: 126.971036,
  //     }}
  //     style={{
  //       // 지도의 크기
  //       width: "100%",
  //       height: "450px",
  //     }}
  //     level={3} // 지도의 확대 레벨
  //   >
  //     {placeArr?.map((place, index) => (
  //       <MapMarker
  //         key={`${place.content}-${place.place.position.lat}`}
  //         position={place.place.position} // 마커를 표시할 위치
  //         image={{
  //           src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
  //           size: {
  //             width: 24,
  //             height: 35,
  //           }, // 마커이미지의 크기입니다
  //         }}
  //         title={place.content} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
  //       />
  //     ))}
  //   </Map>
  // );
};
export default SavedMap;
