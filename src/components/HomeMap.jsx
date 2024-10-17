import React from 'react'

// Utils
import getCategoryIcon from '../utils/getCategoryIcon'

// Naver Map
import { Map, MapMarker } from 'react-kakao-maps-sdk'

export function HomeMap({ storeListData, handleShow, setStoreIcon }) {
  // console.log(JSON.stringify(storeListData))
  //아이콘
  const getCustomMarkerIcon = (storeName, category) => {
    return {
      content: `<img style="height: 24px;" src="${getCategoryIcon(
        category,
      )}" /><span class="bubble">${storeName}</span>`,
      // content: `<img style="height: 24px;" src="${getCategoryIcon(
      // category,
      // )}" /><span class="m-1 badge rounded-pill bg-light text-dark me-1 border border-dark ">${storeName}</span>`,
    }
  }

  return (
    <>
      {/* <NaverMap
        defaultCenter={new navermaps.LatLng(37.54183, 127.0563)}
        defaultZoom={14}
      >
        {storeListData?.map((store, index) => (
          <Marker
            key={index}
            defaultPosition={
              new navermaps.LatLng(store.longitude, store.latitude)
            }
            onClick={() => {
              handleShow(store.storeId, store.name, store.category)
            }}
            icon={getCustomMarkerIcon(store.name, store.category, setStoreIcon)}
          />
        ))}
      </NaverMap> */}
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '100%' }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: '#000' }}>Hello World!</div>
        </MapMarker>
      </Map>
    </>
  )
}
export default HomeMap
