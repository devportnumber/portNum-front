import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

// Google Analytics
import ReactGA from 'react-ga4'

//hooks
import { useAxios } from '../hooks/useAxios'

//components
import ControlledCarousel from '../components/Carousel'
import EventMap from '../components/EventMap'

// Icons
import BakeryIcon from '../assets/icons/maps/point_22_bakery.svg'
import FashionIcon from '../assets/icons/maps/point_22_fashion.svg'
import BarIcon from '../assets/icons/maps/point_22_bar.svg'
import CafeIcon from '../assets/icons/maps/point_22_cafe.svg'
import GoodsIcon from '../assets/icons/maps/point_22_goods.svg'
import RestaurantIcon from '../assets/icons/maps/point_22_restaurant.svg'
import ExhibitionIcon from '../assets/icons/maps/point_22_exhibition.svg'

import ShareIcon from '../assets/icons/modal/icon_blu_18_share.svg'
import DateIcon from '../assets/icons/modal/icon_gry_18_date.svg'
import TimeIcon from '../assets/icons/modal/icon_gry_18_time.svg'
import CopyIcon from '../assets/icons/modal/icon_gry_18_copy.svg'
import PinIcon from '../assets/icons/modal/icon_gry_18_pin.svg'
import MapIcon from '../assets/icons/modal/icon_gry_18_map.svg'

//bootstrap
import { Row, Col } from 'react-bootstrap'
import {
  AiTwotoneClockCircle,
  AiTwotoneCalendar,
  AiFillCopy,
} from 'react-icons/ai'
import { PiMapPinDuotone } from 'react-icons/pi'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import styled from 'styled-components'

// Data
import * as constantsData from '../assets/data/Data'

// Utils
import getCategoryIcon from '../utils/getCategoryIcon'
import copyToClipboard from '../utils/copyToClipboard'
import findStoreDetailById from '../utils/findStoreDetail'

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
`

function Store() {
  const { fetchData, loading, data: storeDetail, error } = useAxios()

  //needed data
  const [storeInfo, setStoreInfo] = useState()
  const [storeId, setStoreId] = useState('')
  const [categoryIcon, setCategoryIcon] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const { storeIdParam } = useParams()

  useEffect(() => {
    //state 아이콘, 상세 정보
    if (location.state) {
      const { storeIcon } = location?.state
      const { storeInfoState } = location?.state

      if (storeInfoState) {
        setStoreInfo(storeInfoState)
      }
      if (storeIcon) {
        setCategoryIcon(storeIcon)
        // setCategoryIcon(getCategoryIcon(storeIcon))
      }
    } else {
      if (storeIdParam) {
        setStoreId(storeIdParam)
      }
    }
  }, [])

  useEffect(() => {
    if (storeId) {
      fetchData(
        `https://api.portnumber.site/store?storeId=${storeId}`,
        'GET',
        null,
        null,
      )
      //dummy data stuff
      // const storeDetailData = findStoreDetailById(parseInt(storeId))
      // setStoreInfo(storeDetailData)
      // setCategoryIcon(getCategoryIcon(storeDetailData.category))
    }
  }, [storeId])

  useEffect(() => {
    if (storeDetail) {
      setStoreInfo(storeDetail)
      setCategoryIcon(getCategoryIcon(storeDetail.category))
    }
  }, [storeDetail])

  useEffect(() => {
    if (categoryIcon) {
      console.log(categoryIcon)
    }
  }, [categoryIcon])

  //주소 복사하기
  const copyAddress = (address, storeId, storeName) => {
    ReactGA.event({
      name: storeName,
      id: storeId,
      page: 'Store',
      category: 'CopyAddress',
      action: 'Click',
      label: 'copy address click',
    })
    copyToClipboard(address)
  }

  const redirectUrl = (urlLink) => {
    ReactGA.event({
      name: urlLink,
      id: storeId,
      page: 'Store',
      category: 'AddressMapUrlRedirect',
      action: 'Click',
      label: '지도로 길찾기',
    })
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
            {/* <IconContainer>
              <StyledPrevIcon
                size="2em"
                color="white"
                border="black"
                onClick={() => window.history.back()}
              />
              <BackBtn type="button" onClick={() => navigate(-1)}>
                <img src={BakeryIcon} alt="" />
              </BackBtn>
            </IconContainer> */}
            <CarouselRow>
              <ControlledCarousel
                imageList={storeInfo.images}
                storeInfo={storeInfo}
                storeId={storeInfo.id}
              />
            </CarouselRow>
            <InfoBox borderline={true}>
              <div className="infoRow">
                <IconImg src={DateIcon} />
                <p>{storeInfo.dates}</p>
              </div>
              <div className="infoRow">
                <IconImg src={TimeIcon} />
                <p>{storeInfo.time}</p>
              </div>
              <pre className="descriptionBox">{storeInfo.description}</pre>
            </InfoBox>
            <InfoBox>
              <div className="infoRow">
                <IconImg src={PinIcon} />
                <p> {storeInfo.address + storeInfo.address_detail}</p>
                <IconImg
                  src={CopyIcon}
                  onClick={() =>
                    copyAddress(
                      `${storeInfo.address + storeInfo.address_detail}`,
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

            {categoryIcon && (
              <MapRow className="pb-4">
                <EventMap
                  longitude={storeInfo.longitude}
                  latitude={storeInfo.latitude}
                  categoryIcon={categoryIcon}
                />
              </MapRow>
            )}
          </Content>
        </Container>
      )}
    </>
  )
}

export default Store

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
  ${(props) =>
    props.borderline &&
    `
    border-bottom: 1px solid #dbdbdb;
  `}

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
    margin: 10px 0;
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

const StyledPrevIcon = styled(MdKeyboardArrowLeft)`
  position: absolute;
  top: 0;
  left: 0;
`
const IconImg = styled.img`
  height: 24px;
`
