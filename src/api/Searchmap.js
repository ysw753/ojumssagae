import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useRef, useState } from "react";
import AddModal from "../components/AddModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedata,
  fetchdata,
  initdata,
  savedata,
} from "../redux/kakaomapSlice";
import { onValue, ref, remove, update } from "firebase/database";
import { db } from "../shared/firebase";
const { kakao } = window;

const SearchMap = () => {
  console.log("계속 렌더링됨");
  const dispatch = useDispatch();
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [updated, setUpdate] = useState([]);

  const [delstate, setDelstate] = useState();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const inputRef = useRef();
  const [place, setPlace] = useState();

  const [isSearching, setIsSearching] = useState(false);

  const [selectedMarker, setSeleteMarker] = useState(false);
  const [inputstate, setInputState] = useState("");
  const [addtoggle, setAddtoggle] = useState(false);
  // const placeArr = useSelector((state) => {
  //   console.log("store호출");
  //   return state.place.value;
  // });
  const [placeArr, setPlaceArr] = useState([]);

  const inputChange = (e) => {
    setInputState(e.currentTarget.value);
  };
  const search = (e) => {
    setPlace(inputstate);

    setIsSearching(true);
    setInputState("");
  };
  const clickHandler = (marker) => {
    setInfo(marker);
    setIsOpen(true);
  };

  const recordHandler = (marker) => {
    setIsOpenModal(true);
  };

  const deleteBtn = (marker) => {
    setDelstate(marker);
    //dispatch(deletedata(marker));
    remove(ref(db, `/${marker.uuid}`));

    const updatedPlaceArr = placeArr.filter((i) => i.uuid !== marker.uuid);
    setPlaceArr(updatedPlaceArr);
  };
  const updateBtn = (marker) => {
    setUpdate(marker);
    setIsOpenModal(true);
  };
  useEffect(() => {
    console.log("다시옴");
    console.log(placeArr);
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      //const tmpArr = [];
      if (data !== null) {
        const arr = Object.values(data).map(
          (place) => {
            return place.placeData;
          }

          // dispatch(savedata(plAace.placeData));
        );
        console.log(arr);
        setPlaceArr(arr);
      }
    });
  }, []);
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, place]);

  return (
    <>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.48492,
          lng: 126.971036,
        }}
        style={{
          width: "100%",
          height: "500px",
        }}
        level={3}
        onCreate={setMap}
      >
        {isSearching &&
          markers.map((marker) => (
            <MapMarker
              style={{ border: "none" }}
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => clickHandler(marker)}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            >
              {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
              {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
              {info && info.position.lat === marker.position.lat && isOpen && (
                <InfoBox style={{ minWidth: "150px", border: "none" }}>
                  <img
                    alt="close"
                    width="14"
                    height="13"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsOpen(false)}
                  />
                  <div style={{ padding: "5px", color: "#000" }}>
                    {marker.content}
                  </div>
                  <button onClick={() => recordHandler(marker)}>기록</button>
                </InfoBox>
              )}
            </MapMarker>
          ))}

        {!isSearching &&
          placeArr.map((place, index) => (
            <>
              {console.log(place.uuid)}
              <MapMarker
                style={{ border: "none" }}
                key={`${place.uuid}`}
                // key={`${place.place.content}-${place.place.position.lng}`}
                position={place.place.position} // 마커를 표시할 위치
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35,
                  }, // 마커이미지의 크기입니다
                }}
                title={place.place.content} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                onClick={() => setSeleteMarker(place)}
              >
                {selectedMarker &&
                  selectedMarker.place.content === place.place.content && (
                    <Custom>
                      <div style={{ color: "#000" }}>{place.place.content}</div>
                      <img
                        alt="close"
                        width="14"
                        height="13"
                        src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                        style={{
                          position: "absolute",
                          right: "5px",
                          top: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSeleteMarker(null)}
                      />
                      {place.imageUrl && (
                        <img
                          style={{
                            width: "150px",
                            height: "100px",
                          }}
                          src={place.imageUrl}
                        />
                      )}

                      <p>{place.contents}</p>
                      <button
                        className="DelBtn"
                        onClick={() => deleteBtn(place)}
                      >
                        삭제
                      </button>
                      <button
                        className="UpdateBtn"
                        onClick={() => updateBtn(place)}
                      >
                        수정
                      </button>
                    </Custom>
                  )}
              </MapMarker>
            </>
          ))}

        {isOpenModal && (
          <AddModal
            setIsSearching={setIsSearching}
            setIsOpenModal={setIsOpenModal}
            info={info}
            updated={updated}
            setUpdate={setUpdate}
            setAddtoggle={setAddtoggle}
            setPlaceArr={setPlaceArr}
          />
        )}
      </Map>
      <SearchInput>
        <input onChange={inputChange} value={inputstate} />
        <button type="submit" onClick={search}>
          찾기
        </button>
      </SearchInput>
    </>
  );
};
export default SearchMap;

const Custom = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  border: none;
  border: 2px solid #fdcb6e;
  border-radius: 5px;
  position: relative;
  button {
    position: absolute;

    background-color: #ffeaa7;
    border: none;
    border-radius: 5px;
    border: 2px solid #fdcb6e;
    margin-left: 10px;
    &:hover {
      cursor: pointer;
      background-color: #fab1a0;
      color: #fff;
    }
  }
  .DelBtn {
    bottom: 10px;
  }
  .UpdateBtn {
    bottom: 10px;
    left: 50px;
  }
`;
const SearchInput = styled.div`
  display: flex;
  justify-content: left;
  padding: 50px;
  input {
    width: 300px;
    height: 30px;
    border: none;
    border-bottom: 1px solid black;
  }
  button {
    width: 100px;
    background-color: #ffeaa7;
    border: none;
    border-radius: 5px;
    border: 2px solid #fdcb6e;
    margin-left: 10px;
    &:hover {
      cursor: pointer;
      background-color: #fab1a0;
      color: #fff;
    }
  }
`;
const InfoBox = styled.div`
  border: none;
  button {
    background-color: #ffeaa7;
    border-radius: 5px;

    border: none;
    border: 2px solid #fdcb6e;
    margin: 3px;
    &:hover {
      cursor: pointer;
      background-color: #fab1a0;
      color: #fff;
    }
  }
`;
