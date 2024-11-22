import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';

// Google Analytics
// import ReactGA from 'react-ga4'

//hooks
import { useAxios } from '../hooks/useAxios'

//components
import ControlledCarousel from '../components/Carousel'
// import EventMap from '../components/EventMap'

// Kakao Map
import { Map, MapMarker } from 'react-kakao-maps-sdk'

// Icons
// import ShareIcon from '../assets/icons/modal/icon_blu_18_share.svg'
import DateIcon from '../assets/icons/modal/icon_gry_18_date.svg'
import TimeIcon from '../assets/icons/modal/icon_gry_18_time.svg'
import CopyIcon from '../assets/icons/modal/icon_gry_18_copy.svg'
import PinIcon from '../assets/icons/modal/icon_gry_18_pin.svg'
import MapIcon from '../assets/icons/modal/icon_gry_18_map.svg'

//bootstrap
import { Row } from 'react-bootstrap'

// import { PiMapPinDuotone } from 'react-icons/pi'
// import { MdKeyboardArrowLeft } from 'react-icons/md'

import styled from 'styled-components'

// Data
// import * as constantsData from '../assets/data/Data'

// Utils
import copyToClipboard from '../utils/copyToClipboard'
// import findStoreDetailById from '../utils/findStoreDetail'

// Icons
import CHINESE_BLK from '../assets/icons/maps/point_22_chn_blk.svg'
import JAPANESE_BLK from '../assets/icons/maps/point_22_jpn_blk.svg'
import KOREAN_BLK from '../assets/icons/maps/point_22_kor_blk.svg'
import WESTERN_BLK from '../assets/icons/maps/point_22_wst_blk.svg'
import CHINESE_WHT from '../assets/icons/maps/point_22_chn_wht.svg'
import JAPANESE_WHT from '../assets/icons/maps/point_22_jpn_wht.svg'
import KOREAN_WHT from '../assets/icons/maps/point_22_kor_wht.svg'
import RESTAURANT from '../assets/icons/maps_archive/point_22_restaurant.svg'
import { StoreInfo } from './Home'
import { getIconForCategory } from './Home'

const imageSlideStyle = `
div.scroll-container {
  background-color: #333;
  overflow: auto;
  white-space: nowrap;
  padding: 10px;
}

div.scroll-container img {
  padding: 10px;
}

.cover-img {
height: 200px;
border: 2px solid black;
border-radius: 18px;

`

function Store() {
  const { fetchData, loading, data: storeDetail, error } = useAxios()

  //needed data
  const [storeInfo, setStoreInfo] = useState<StoreInfo>()
  const [nickName, setNickName] = useState<string>(
    localStorage.getItem('path') ?? '',
  )
  const [paramId, setParamId] = useState<string>(
    localStorage.getItem('param') ?? '',
  )

  const location = useLocation();
  
  interface StorePageState {
    storeIcon: string;   
    storeInfoState: object;
  }

  // Extract the state passed through navigate
  const { storeIcon, storeInfoState }: StorePageState = location.state || {}; 
// console.log("storeInfoState---------"+JSON.stringify(storeInfoState))
  //dummy data
  const catImages = [
    'https://images.unsplash.com/photo-1592194996308-7e3cfb1d8c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNhdHN8ZW58MHx8fHwxNjY4NDQ4MjM2&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1604503467506-2839287a0b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGNhdHN8ZW58MHx8fHwxNjY4NDQ4MjM2&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fGNhdHN8ZW58MHx8fHwxNjY4NDQ4MjM2&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNhdHN8ZW58MHx8fHwxNjY4NDQ4MjM2&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1555685812-6e6c031bc028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGNhdHN8ZW58MHx8fHwxNjY4NDQ4MjM2&ixlib=rb-1.2.1&q=80&w=400',
  ]

  const [dummyImages, setDummyImages] = useState<string[]>(catImages)

  // const location = useLocation()
  // const { storeIdParam } = useParams()

  useEffect(() => {
    const totalPathName = window.location.pathname.slice(1) // Remove leading slash

    const parts = totalPathName.split('/')

    // console.log(JSON.stringify('paramId----' + paramId))
    // console.log(JSON.stringify('nickName----' + nickName))
    if (parts[1] && nickName) {
      fetchData(
        `https://api.portnumber.site/admin/popup/api/${nickName}/${parts[1]}`,
        'GET',
        null,
        null,
      )
    }
  }, []) //storeId
  // fetchData, nickName, paramId

  useEffect(() => {
    if (storeDetail) {
      // console.log('storeDetail-' + JSON.stringify(storeDetail))
      setStoreInfo(storeDetail.data)
    }
  }, [storeDetail])

  //주소 복사하기
  const copyAddress = (address: string, storeId: number, storeName: string) => {
    // ReactGA.event({
    //   name: storeName,
    //   id: storeId,
    //   page: 'Store',
    //   category: 'CopyAddress',
    //   action: 'Click',
    //   label: 'copy address click',
    // })
    copyToClipboard(address)
  }

  const redirectUrl = (urlLink: string) => {
    // ReactGA.event({
    //   name: urlLink,
    //   id: storeId,
    //   page: 'Store',
    //   category: 'AddressMapUrlRedirect',
    //   action: 'Click',
    //   label: '지도로 길찾기',
    // })
    window.location.href = urlLink
  }

  return (
    // {loading && <div>Loading...</div>}
    // {error && <div>Error: {error.message}</div>}
    <>
      <style>{imageSlideStyle}</style>
      {storeInfo && (
        <Container>
          <Content>
            <CarouselRow>
              <ControlledCarousel
                imageList={dummyImages} //imageList={storeInfo.images}
                storeInfo={storeInfo}
                storeId={storeInfo.popupId}
              />
            </CarouselRow>
            <InfoBox>
              <div className="infoRow">
                <IconImg src={DateIcon} />
                {storeInfo.startDate}~{storeInfo.endDate}
              </div>
              <div className="infoRow" style={{ marginBottom: '20px' }}>
                <IconImg src={TimeIcon} />
                time
              </div>
              <pre className="descriptionBox">
                {storeInfo.detailDescription}
              </pre>
            </InfoBox>
            <InfoBox>
              <div className="infoRow">
                <IconImg src={PinIcon} />
                {storeInfo.address.address + storeInfo.address.addressDetail}
                <IconImg
                  src={CopyIcon}
                  onClick={() =>
                    copyAddress(
                      `${
                        storeInfo.address.address +
                        storeInfo.address.addressDetail
                      }`,
                      storeInfo.popupId,
                      `${storeInfo.name}`,
                    )
                  }
                />
              </div>
              <div className="infoRow" style={{ marginBottom: '0px' }}>
                <IconImg src={MapIcon} />
                <StyledMapLink
                  onClick={() => redirectUrl(`${storeInfo.mapUrl}`)}
                >
                  지도로 길찾기
                </StyledMapLink>
              </div>
            </InfoBox>
            <MapRow className="pb-4">
              <Map
                center={{
                  lat: storeInfo.point?.latitude,
                  lng: storeInfo.point?.longitude,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                level={4}
              >
                <MapMarker
                  position={{
                    lat: storeInfo.point?.latitude,
                    lng: storeInfo.point?.longitude,
                  }}
                  image={{
                    src: getIconForCategory(storeInfo.category), //'ICON_'+ store.category
                    size: {
                      width: 24,
                      height: 24,
                    },
                  }}
                />
              </Map>
            </MapRow>
          </Content>
        </Container>
      )}
    </>
  )
}

export default Store
// const RelatedPopUpImg = styled(Col)`
//   colspan: 4;
// `
// const RelatedPopUpContainer = styled(Row)`
//   width: 100%;
// `
const CarouselRow = styled(Row)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70vh;
`
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 14px;
  width: 100%;
  padding: 20px 24px;

  .infoRow {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 6px;
    margin-bottom: 10px;
  }
  .descriptionBox {
    font-size: 14px;
    line-height: 1.7;
    white-space: pre-wrap;
  }
`

// const InfoRow = styled(Row)`
//   text-align: left;
//   font-size: 15px;
//   width: 100%;
// `
const MapRow = styled(Row)`
  display: flex;
  justify-content: center;
  text-align: left;
  width: 100%;
  font-size: 12px;
  height: 300px;
  /* margin-top: 20px; */
`
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
`
const Content = styled.div`
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const StyledMapLink = styled.p`
  color: #0971f8;
  text-decoration: underline;
`

// const StyledPrevIcon = styled(MdKeyboardArrowLeft)`
//   position: absolute;
//   top: 0;
//   left: 0;
// `
const IconImg = styled.img`
  height: 24px;
`
