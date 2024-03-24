import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

// Google Analytics
import ReactGA from 'react-ga4'

//hooks
import { useAxios } from '../hooks/useAxios'

//components
import ControlledCarousel from '../components/Carousel'
import EventMap from '../components/EventMap'

//bootstrap
import { Row, Col } from 'react-bootstrap'
import {
  AiTwotoneClockCircle,
  AiTwotoneCalendar,
  AiFillCopy,
} from 'react-icons/ai'
import { PiMapPinDuotone } from 'react-icons/pi'

import styled from 'styled-components'

function Store() {
  //더미데이터
  const storeDummy = {
    id: '2',
    category: 'cafe',
    dates: '24.04.29 ~ 42.03.29',
    time: '목요일 12:00 ~ 6:00',
    name: 'Cafe Name 1',
    longitude: '37.3695704',
    latitude: '127.105399',
    address: '서울 강남구 강남대로',
    address_detail: '1-1',
    neighborhood: '서울 강남구',
    keywords: ['cafe', 'coffee'],
    description: 'Cafe Description 1',
    images: [
      'https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2395&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1562280963-8a5475740a10?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1485518882345-15568b007407?q=80&w=2542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    regdt: '2024-03-17',
  }
  const { storeId } = useParams()
  const { fetchData, loading, data: storeDetail, error } = useAxios()

  //needed data
  const [imageList, setImageList] = useState()
  const [coordinates, setCoordinates] = useState()
  const [storeInfo, setStoreInfo] = useState()
  const [categoryIcon, setCategoryIcon] = useState('')
  const location = useLocation()

  useEffect(() => {
    setStoreInfo(storeDummy)
    //state 아이콘
    const { storeIcon } = location.state
    if (storeIcon) {
      console.log(storeIcon)

      setCategoryIcon(storeIcon)
    }
  }, [])

  useEffect(() => {
    // if (storeId) {
    //   fetchData({
    //     url: `https://jsonplaceholder.typicode.com/todos/${storeId}`,
    //     method: 'GET',
    //   })
    // }
  }, [storeId])

  useEffect(() => {
    // if (storeDetail) {
    //setStoreInfo(storeDetail)
    // let categoryIcon
    //   switch (category) {
    //     case 'bar':
    //       categoryIcon =
    //         '/static/media/point_22_bar.9075eb533419c775a719b0bba0cae22b.svg'
    //       break
    //     case 'bakery':
    //       categoryIcon =
    //         '/static/media/point_22_bakery.a059d87647b55d97dfdec611f01807a0.svg'
    //       break
    //     case 'cafe':
    //       categoryIcon =
    //         '/static/media/point_22_cafe.6a9cf6367a1a18793d10f7675a2dd6b1.svg'
    //       break
    //     case 'fashion':
    //       categoryIcon =
    //         '/static/media/point_22_fashion.a526b493bbdaff38a71dd4219bf4cea3.svg'
    //       break
    //     case 'goods':
    //       categoryIcon =
    //         '/static/media/point_22_goods.8f2c42dd76825416e6f1e949d4174b24.svg'
    //       break
    //     case 'restaurant':
    //       categoryIcon =
    //         '/static/media/point_22_restaurant.5c427a0dc4858890f49698fec4732628.svg'
    //       break
    //     default:
    //       categoryIcon =
    //         '/static/media/point_22_goods.8f2c42dd76825416e6f1e949d4174b24.svg'
    //   }
    //  setCategoryIcon(categoryIcon)
    //setCategoryIcon(storeDetail)
    // }
  }, [storeDetail])

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
    // {loading && <div>Loading...</div>}
    // {error && <div>Error: {error.message}</div>}
    storeInfo && (
      <Container>
        <Content>
          <CarouselRow>
            <ControlledCarousel
              imageList={storeInfo.images}
              storeInfo={storeInfo}
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
                    copyAddress('addresssss', 'storeId', 'storeName')
                  }
                />
              </Col>
            </Row>
          </InfoRow>
          {categoryIcon && (
            <MapRow className="pb-4">
              <EventMap
                latitude={storeInfo.latitude}
                longitude={storeInfo.longitude}
                categoryIcon={categoryIcon}
              />
            </MapRow>
          )}
          {/* <Row >
          SUB CONTENT
        </Row> */}
        </Content>
      </Container>
    )
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
  height: 35vh;
  font-size: 15px;
  width: 100%;
`
const MapRow = styled(Row)`
  display: flex;
  justify-content: center;
  text-align: left;
  width: 100%;
  height: 34vh;
  font-size: 12px;
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
