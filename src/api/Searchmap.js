import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import AddModal from "../components/AddModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { onValue, ref, remove } from "firebase/database";
import { db } from "../shared/firebase";
const { kakao } = window;

const SearchMap = () => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [updated, setUpdate] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [place, setPlace] = useState();

  const [isSearching, setIsSearching] = useState(false);

  const [selectedMarker, setSeleteMarker] = useState(false);
  const [inputstate, setInputState] = useState("");
  const [gomymapstate, setgomtmapstate] = useState(false);
  const [placeArr, setPlaceArr] = useState([]);

  const inputChange = (e) => {
    setInputState(e.currentTarget.value);
  };
  const search = (e) => {
    if (inputstate == "") return;
    setPlace(inputstate);

    setIsSearching(true);
    setInputState("");
  };
  const gomymap = () => {
    setIsSearching(false);
    setgomtmapstate((prev) => prev);
  };
  const clickHandler = (marker) => {
    setInfo(marker);
    setIsOpen(true);
  };
  const closeInfo = () => {
    setIsOpen(false);
    setIsOpenModal(false);
  };
  const closeCustom = () => {
    setIsOpenModal(false);
    setSeleteMarker(null);
  };
  const infoClick = (place) => {
    setSeleteMarker(place);
    setIsOpenModal(false);
  };
  const recordHandler = (marker) => {
    setIsOpenModal(true);
  };

  const deleteBtn = (marker) => {
    remove(ref(db, `/${marker.uuid}`));

    const updatedPlaceArr = placeArr.filter((i) => i.uuid !== marker.uuid);
    setPlaceArr(updatedPlaceArr);
    setIsOpenModal(false);
  };
  const updateBtn = (marker) => {
    setUpdate(marker);
    setIsOpenModal(true);
  };
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        const arr = Object.values(data).map((place) => {
          return place.placeData;
        });

        setPlaceArr(arr);
      }
    });
  }, [gomymapstate]);
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

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Section>
        <Header>나의흔적</Header>
        <SearchSection>
          <p>가본곳을 찾아볼까요?</p>
          <SearchInput>
            <input onChange={inputChange} value={inputstate} />
            {isSearching ? (
              <button type="button" onClick={gomymap}>
                내 지도 가기
              </button>
            ) : (
              <button type="submit" onClick={search}>
                찾기
              </button>
            )}
          </SearchInput>
        </SearchSection>
      </Section>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.48492,
          lng: 126.971036,
        }}
        style={{
          width: "90%",
          margin: "auto",
          height: "90vh",
        }}
        level={3}
        onCreate={setMap}
      >
        {isSearching &&
          markers.map((marker) => (
            <MapMarker
              style={{ minWidth: "200px" }}
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => clickHandler(marker)}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            >
              {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
              {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
              {info && info.position.lat === marker.position.lat && isOpen && (
                <InfoBox style={{ minWidth: "200px", border: "none" }}>
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
                    onClick={closeInfo}
                    // onClick={() => setIsOpen(false)}
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
                // onClick={() => setSeleteMarker(place)}
                onClick={() => infoClick(place)}
              >
                {selectedMarker &&
                  selectedMarker.place.content === place.place.content && (
                    <Custom>
                      <p
                        style={{
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: "28px",
                          margin: "8px",
                        }}
                      >
                        {place.place.content}
                      </p>
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
                        onClick={closeCustom}
                      />

                      {place.imageUrl && (
                        <StyledSlider {...settings}>
                          {place.imageUrl.map((image) => {
                            return (
                              <img
                                style={{
                                  width: "100%",
                                  height: "40%",
                                  objectFit: "cover",
                                }}
                                src={image}
                              />
                            );
                          })}
                        </StyledSlider>
                      )}

                      <CustomContents>
                        {place.contents.split("<br/>").map((line) => {
                          return (
                            <span>
                              {line}
                              <br />
                            </span>
                          );
                        })}
                      </CustomContents>
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
            setPlaceArr={setPlaceArr}
          />
        )}
      </Map>
    </>
  );
};
export default SearchMap;
const Header = styled.div`
  padding: 20px;
  font-size: 48px;
  font-weight: bold;
  font-family: Dongle;
  text-align: center;
`;
const Section = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 900px;
`;
const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Dongle;
  font-size: 36px;
`;
const Custom = styled.div`
  width: 300px;
  height: 480px;
  background-color: white;
  p {
    padding: 0;
    margin: 0;
    height: 30px;
  }
  position: relative;
  button {
    width: 40px;

    padding: 0;
    position: absolute;
    font-size: 18px;
    font-family: Dongle;
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
    bottom: 5px;
  }
  .UpdateBtn {
    bottom: 5px;
    left: 50px;
  }
`;
const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: -30px;
  }

  .slick-list {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    img {
      width: auto;
      height: 200px;
      object-fit: cover;
    }
  }
`;

const CustomContents = styled.div`
  padding: 0px 5px;
  height: 170px;
  color: #353535;
  font-size: 20px;
  font-family: Dongle;

  overflow: scroll;
  textoverflow: clip;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
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
    border-bottom: 1px solid #fdcb6e;
    &:focus {
      outline-color: #fdcb6e;
    }
  }

  button {
    font-size: 22px;
    font-family: Dongle;
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
