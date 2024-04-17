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
        setCategoryIcon(getCategoryIcon(storeIcon))
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
                <AiTwotoneCalendar />
                <p>{storeInfo.dates}</p>
              </div>
              <div className="infoRow">
                <AiTwotoneClockCircle />
                <p>{storeInfo.time}</p>
              </div>
              <div className="descriptionBox">{storeInfo.description}</div>
            </InfoBox>
            <InfoBox>
              <div className="infoRow">
                <PiMapPinDuotone />
                <p> {storeInfo.address + storeInfo.address_detail}</p>
                <AiFillCopy
                  onClick={() =>
                    copyAddress(
                      `${storeInfo.address + storeInfo.address_detail}`,
                      `${storeInfo.name}`,
                    )
                  }
                />
              </div>
            </InfoBox>
            {/* <InfoRow className="px-3 pt-3 pb-0">
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
            </InfoRow> */}
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
  padding: 24px 20px;
  ${(props) =>
    props.borderline &&
    `
    border-bottom: 1px solid #dbdbdb;
  `}

  .infoRow {
    display: flex;
    flex-direction: row;
    gap: 6px;
    margin-bottom: 10px;
  }
  .descriptionBox {
    font-size: 14px;
    line-height: 1.7;
    margin: 10px 0;
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
const IconContainer = styled.div`
  /* z-index: 100; */
  /* position: absolute;
  top: 0;
  left: 0; */
`

const BackBtn = styled.button`
  /* position: absolute;
  top: 0;
  left: 0; */
`

const StyledPrevIcon = styled(MdKeyboardArrowLeft)`
  position: absolute;
  top: 0;
  left: 0;
`
