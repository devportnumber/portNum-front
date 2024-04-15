import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

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

// Data
import * as constantsData from './ConstantsData.js'

//bootstrap
import { Row, Col } from 'react-bootstrap'
import {
  AiTwotoneClockCircle,
  AiTwotoneCalendar,
  AiFillCopy,
} from 'react-icons/ai'
import { PiMapPinDuotone } from 'react-icons/pi'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { IoMapOutline } from 'react-icons/io5'

import styled from 'styled-components'

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
      }
    } else {
      if (storeIdParam) {
        setStoreId(storeIdParam)
      }
    }
  }, [])

  //dum data get object from id param
  const findStoreDetailById = (id) => {
    return constantsData.storeListDetailDbData.find((item) => item.id === id)
  }

  useEffect(() => {
    if (storeId) {
      fetchData(
        `https://api.portnumber.site/store?storeId=${storeId}`,
        'GET',
        null,
        null,
      )
    }
  }, [storeId])

  // useEffect(() => {
  //   if (storeDetail) {
  //     setStoreInfo(storeDetail)
  //     setCategoryIcon(getCategoryIcon(storeDetail.category))
  //   }
  // }, [storeDetail])

  const getCategoryIcon = (category) => {
    let categoryIcon
    switch (category) {
      case 'bar':
        categoryIcon =
          '/static/media/point_22_bar.9075eb533419c775a719b0bba0cae22b.svg'
        break
      case 'bakery':
        categoryIcon =
          '/static/media/point_22_bakery.a059d87647b55d97dfdec611f01807a0.svg'
        break
      case 'cafe':
        categoryIcon =
          '/static/media/point_22_cafe.6a9cf6367a1a18793d10f7675a2dd6b1.svg'
        break
      case 'fashion':
        categoryIcon =
          '/static/media/point_22_fashion.a526b493bbdaff38a71dd4219bf4cea3.svg'
        break
      case 'goods':
        categoryIcon =
          '/static/media/point_22_goods.8f2c42dd76825416e6f1e949d4174b24.svg'
        break
      case 'restaurant':
        categoryIcon =
          '/static/media/point_22_restaurant.5c427a0dc4858890f49698fec4732628.svg'
        break
      default:
        categoryIcon =
          '/static/media/point_22_goods.8f2c42dd76825416e6f1e949d4174b24.svg'
    }
    return categoryIcon
    // setStoreIcon(categoryIcon)
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

  //복사 기능
  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    alert('복사가 완료되었습니다.')
    document.body.removeChild(textarea)
  }

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

  return (
    <>
      <style>{imageSlideStyle}</style>
      {storeInfo && (
        <Container>
          <Content>
            <IconContainer>
              <StyledPrevIcon
                size="2em"
                color="white"
                border="black"
                onClick={() => window.history.back()}
              />
            </IconContainer>
            <CarouselRow>
              <ControlledCarousel
                imageList={storeInfo.images}
                storeInfo={storeInfo}
                storeId={storeInfo.id}
              />
            </CarouselRow>
            <InfoRow className="px-3 pt-3 pb-0">
              <Row className="mb-2 pb-2 border-bottom">
                <Row className="pb-1">
                  <Col xs={1} className="ps-0">
                    <AiTwotoneCalendar />
                  </Col>
                  <Col className="ps-0">{storeInfo.dates}</Col>
                </Row>
                <Row className="pb-3">
                  <Col xs={1} className="ps-0">
                    <AiTwotoneClockCircle />
                  </Col>
                  <Col className="ps-0">{storeInfo.time}</Col>
                </Row>
                <Row>{storeInfo.description}</Row>
              </Row>
              <Row className="mt-3">
                <Col xs={1} className="ps-0">
                  <PiMapPinDuotone />
                </Col>
                <Col className="ps-0">
                  {storeInfo.address + storeInfo.address_detail} &nbsp;
                  <AiFillCopy
                    onClick={() =>
                      copyAddress(
                        `${storeInfo.address + storeInfo.address_detail}`,
                        `${storeInfo.name}`,
                      )
                    }
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col xs={1} className="ps-0">
                  <IoMapOutline />
                </Col>
                <Col
                  className="ps-0"
                  onClick={() => redirectUrl(`${storeInfo.map_link}`)}
                >
                  <p class="text-primary">지도로 길찾기</p>
                </Col>
              </Row>
            </InfoRow>
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
const InfoRow = styled(Row)`
  text-align: left;
  font-size: 15px;
  width: 100%;
`
const MapRow = styled(Row)`
  display: flex;
  justify-content: center;
  text-align: left;
  width: 100%;
  font-size: 12px;
  height: 300px;
  margin-top: 20px;
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
const IconContainer = styled.div`
  z-index: 10;
`

const StyledPrevIcon = styled(MdKeyboardArrowLeft)`
  position: absolute;
  top: 0;
  left: 0;
`
