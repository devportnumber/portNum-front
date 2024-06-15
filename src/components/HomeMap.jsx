import React from 'react'

// Utils
import getCategoryIcon from '../utils/getCategoryIcon'

// Naver Map
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from 'react-naver-maps'

export function HomeMap({ storeListData, handleShow, setStoreIcon }) {
  const navermaps = useNavermaps()
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
      <NaverMap
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
      </NaverMap>
    </>
  )
}
export default HomeMap
