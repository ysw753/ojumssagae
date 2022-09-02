import axios from "axios";

const kka = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search/keyword.json?query={}",
  credentials: true,
  headers: { "Content-Type": "application/json" },
});
export const kakaoApis = {
  search: (searchkeyword) => kka.get,
};
