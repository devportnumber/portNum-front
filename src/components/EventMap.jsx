import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AiFillShopping } from 'react-icons/ai'
import { renderToString } from 'react-dom/server'
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from 'react-naver-maps'

function EventMap({ latitude, longitude, categoryIcon }) {
  const navermaps = useNavermaps()

  const iconString = renderToString(<AiFillShopping />)
  const modifiedIconString = iconString
    .replace(/currentColor/g, '#FF1D8E')
    .replace(/<svg/, '<svg width="30" height="30"')

  const customMarkerIcon = {
    content: `<img src="${categoryIcon}"` + modifiedIconString,
  }

  return (
    <StyledMapDiv>
      <NaverMap
        defaultCenter={new navermaps.LatLng(longitude, latitude)}
        defaultZoom={15}
      >
        <Marker
          defaultPosition={new navermaps.LatLng(longitude, latitude)}
          onClick={() => console.log()}
          icon={customMarkerIcon}
        />
      </NaverMap>
    </StyledMapDiv>
  )
}

export default EventMap

const StyledMapDiv = styled(MapDiv)`
  height: 250px;
  width: 100%;
  align-self: center;
`
