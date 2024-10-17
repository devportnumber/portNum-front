import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AiFillShopping } from 'react-icons/ai'
import { renderToString } from 'react-dom/server'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

function EventMap({ latitude, longitude, categoryIcon }) {
  // const navermaps = useNavermaps()

  const iconString = renderToString(<AiFillShopping />)
  const modifiedIconString = iconString
    .replace(/currentColor/g, '#FF1D8E')
    .replace(/<svg/, '<svg width="30" height="30"')

  const customMarkerIcon = {
    content: `<img src="${categoryIcon}"` + modifiedIconString,
  }

  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '360px' }}
      >
        <MapMarker position={{ lat: latitude, lng: longitude }}>
          <div style={{ color: '#000' }}>Hello World!</div>
        </MapMarker>
      </Map>
    </>

    //   <StyledMapDiv>
    //     <NaverMap
    //       defaultCenter={new navermaps.LatLng(longitude, latitude)}
    //       defaultZoom={15}
    //     >
    //       <Marker
    //         defaultPosition={new navermaps.LatLng(longitude, latitude)}
    //         onClick={() => console.log()}
    //         icon={customMarkerIcon}
    //       />
    //     </NaverMap>
    //   </StyledMapDiv>
  )
}

export default EventMap

// const StyledMapDiv = styled(MapDiv)`
//   height: 250px;
//   width: 100%;
//   align-self: center;
// `
