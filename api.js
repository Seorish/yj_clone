// 화장실 데이터를 맵에서 표시하기
// const markerMap = new Vue({
//   el: "#test",
//   data: {
//     apiList: [],
//   },
//   methods: {
//     search: function () {
//       const self = this;
//       const APIURL = "http://api.data.go.kr/openapi/tn_pubr_public_toilet_api";
//       const APIKEY =
//         "sQi%2FzMQ3vue0d1rD%2FvPtCe2OgezQc37UYHrqZnNakgkK%2B1ugwK%2BWAkj74lu4Kpz1WbP3s%2FlJYG%2B9Utm%2BCZVSJg%3D%3D";

//       axios
//         .get(`${APIURL}?serviceKey=${APIKEY}&pageNo=10&numOfRows=500&type=json`)
//         .then((res) => {
//           const preData = res.data.response.body.items;
//           const upData = preData.filter(
//             (li) => li.rdnmadr !== "null" && li.lnmadr !== "null"
//           );
//           self.apiList = upData;
//         });
//       console.log(this.apiList);
//     },
//   },
// });

// ******************지도관련*****************************************************************************
const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(37.606985002299545, 127.04176711490993),
  //   center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3,
};

// 지도 생성
const map = new kakao.maps.Map(container, options);
// 주소를 좌표로 반환하는 객체 생성
const geocoder = new kakao.maps.services.Geocoder();
function myMaker(address) {
  geocoder.addressSearch(
    // 주소
    address,
    function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
          content:
            '<a href="review.html"><div style="width:150px;text-align:center;padding:6px 0;">화장실</div></a>',
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        // map.setCenter(coords);
      }
    }
  );
}
// ******************화장실 정보 관련*****************************************************************************
const APIURL = "http://api.data.go.kr/openapi/tn_pubr_public_toilet_api";
const APIKEY =
  "sQi%2FzMQ3vue0d1rD%2FvPtCe2OgezQc37UYHrqZnNakgkK%2B1ugwK%2BWAkj74lu4Kpz1WbP3s%2FlJYG%2B9Utm%2BCZVSJg%3D%3D";
axios
  .get(`${APIURL}?serviceKey=${APIKEY}&pageNo=10&numOfRows=500&type=json`)
  .then((res) => {
    const preData = res.data.response.body.items;
    const upData = preData.filter(
      (li) => li.rdnmadr !== "null" && li.rdnmadr !== ""
    );
    console.log(upData);
    for (let i = 0; i < upData.length; i++) {
      myMaker(upData[i].rdnmadr);
    }
  });
