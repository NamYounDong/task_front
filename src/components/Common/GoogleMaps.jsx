import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getLatLngAddr, getMsrstnInfoInqireSvc } from '../../redux/slices/apiSlices';
import { GoogleMap, LoadScriptNext, MarkerF, InfoWindow } from "@react-google-maps/api";

const GoogleMaps = () => {
    // 데이터 조회 및 데이터 store에 저장
    const dataList = useSelector(state => state.api.msrstnInfoInqireSvcData);
    const dispatch = useDispatch();
    useEffect(() => {
        const getMsrData = async () => {
            const options = {
              method: 'get'
            }
            await dispatch(getMsrstnInfoInqireSvc(options));
        }
        getMsrData();
    }, [])

    // 지도
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // 정확한 이유는 모르겠는데 이거 처리 안하니까 지맘대로 처음 세팅한 중앙으로 화면이동함.
    const [center, setCenter] = useState({lat: 37.569227, lng: 126.9777256}); 
    const mapOptions = {
        zoom : 10,
        center : center,
        mapContainerClassName:"map-container",
        mapContainerStyle:{ width: '100%', height: '100%' }
    }

    const [selectedMarker, setSelectedMarker] = useState(null);


    const [markerArr, setMarkerArr] = useState([]);

    const clickGoogleMaps = async (el) => {
        try {
            const options = {
                method : 'post',
                body : {lat : el.latLng.lat(), lng: el.latLng.lng()},
                callback : (data) => {
                    console.log(data);
                    setMarkerArr([...markerArr, {dmX : el.latLng.lat(), dmY: el.latLng.lng(), addr:data.addr.formatted_address}])
                }
            }
            await dispatch(getLatLngAddr(options)).unwrap();
        } catch (error) {
            console.log(`Get Address Error : ${error.message}`)
        } 
    }

    return (
      <div className="page_section google-map">
          <Navbar />
          <div className="panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto">
              <LoadScriptNext googleMapsApiKey={apiKey}>
                  <GoogleMap {...mapOptions} onClick={clickGoogleMaps}>
                      {
                          dataList != null && (
                            [...dataList, ...markerArr].map((data, idx) => {
                              return <MarkerF 
                                        key={idx} 
                                        position={{lat : Number(data.dmX), lng :  Number(data.dmY)}} 
                                        title={data.addr}  // 툴팁용
                                        label={{
                                            text: data.addr,
                                            color: "black",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            className: "marker-label"}}
                                            // 툴팁 : 클릭 옵션도 줘야되네?
                                        onClick={() => setSelectedMarker(data)}> 

                                        {
                                            // 아니... 리액트는 툴팁도 별도로 생성해줘서 처리해야되는거여?
                                            selectedMarker && selectedMarker.stationName === data.stationName && (
                                                // 툴팁 : InfoWindow 도 import해야되는거여?
                                                <InfoWindow
                                                    position={{lat : Number(data.dmX), lng : Number(data.dmY) }}
                                                    onCloseClick={() => setSelectedMarker(null)}>
                                                    <div className="text-gray-950">
                                                        <h3>{data.addr}</h3>
                                                        <p>{Number(data.dmX)}, {Number(data.dmY)}</p>
                                                    </div>
                                                </InfoWindow>
                                            )
                                        }
                                    </MarkerF>
                            })
                          )
                        }
                  </GoogleMap>
              </LoadScriptNext>
          </div>
      </div>
    )
}


export default GoogleMaps
