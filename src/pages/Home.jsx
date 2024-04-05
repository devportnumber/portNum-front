import React, { useState, useEffect } from 'react'
import { renderToString } from 'react-dom/server'

// Google Analytics
import ReactGA from 'react-ga4'

// Naver Map
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from 'react-naver-maps'

// Bootstrap
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import { AiOutlineSmile, AiOutlineArrowRight } from 'react-icons/ai'

// Icons
import BakeryIcon from '../assets/icons/maps/point_22_bakery.svg'
import FashionIcon from '../assets/icons/maps/point_22_fashion.svg'
import BarIcon from '../assets/icons/maps/point_22_bar.svg'
import CafeIcon from '../assets/icons/maps/point_22_cafe.svg'
import GoodsIcon from '../assets/icons/maps/point_22_goods.svg'
import RestaurantIcon from '../assets/icons/maps/point_22_restaurant.svg'
import Logo from '../assets/icons/logo/paulseee_logo.png'

// Components
import StoreModal from '../components/Modal'

// Hooks
import { useAxios } from '../hooks/useAxios'

import styled from 'styled-components'

function Home() {
  const dummyData = [
    {
      storeId: 1,
      name: '기안84 개인전',
      category: 'fashion',
      longitude: '37.548654',
      latitude: '127.051588',
    },
    {
      storeId: 2,
      name: '엄브로',
      category: 'bakery',
      longitude: '37.579772',
      latitude: '127.048544',
    },
    {
      storeId: 3,
      name: '가나초콜릿하우스',
      category: 'cafe',
      longitude: '37.536602',
      latitude: '127.044783',
    },
    {
      storeId: 4,
      name: '샤넬 조향 마스터클래스',
      category: 'fashion',
      longitude: '37.579686',
      latitude: '127.048707',
    },
    {
      storeId: 5,
      name: '마뗑킴',
      category: 'bakery',
      longitude: '37.579208',
      latitude: '127.047532',
    },
    {
      storeId: 6,
      name: '반클리프',
      category: 'restaurant',
      longitude: '37.560261',
      latitude: '127.0303',
    },
    {
      storeId: 7,
      name: '폴씨네 뚝도상점',
      category: 'goods',
      longitude: '37.545874',
      latitude: '127.103174',
    },
    {
      storeId: 8,
      name: '페넥',
      category: 'bakery',
      longitude: '37.579235',
      latitude: '127.047194',
    },
    {
      storeId: 9,
      name: '열어봐 너의 민감함',
      category: 'cafe',
      longitude: '37.580833',
      latitude: '127.050153',
    },
    {
      storeId: 10,
      name: '1𝑆𝑇 𝐷𝐼𝑁𝑇𝑂 𝑃𝑂𝑃-𝑈𝑃 <',
      category: 'fashion',
      longitude: '37.564735',
      latitude: '127.033939',
    },
  ]

  const { fetchData, loading, data, error } = useAxios()
  const {
    fetchData: getStoreInfo,
    loading: storeLoading,
    data: getStoreInfoData,
    error: storeInfoError,
  } = useAxios()

  const [show, setShow] = useState(false)
  const [storeInfo, setStoreInfo] = useState({})
  const [storeId, setStoreId] = useState('')
  const [storeIcon, setStoreIcon] = useState('')
  const [storeList, setStoreList] = useState()

  //모달 공유
  const queryParameters = new URLSearchParams(window.location.search)
  const storeIdParam = queryParameters.get('id')
  useEffect(() => {
    if (storeIdParam) {
      setStoreId(storeIdParam)
    }
  }, [storeIdParam])

  useEffect(() => {
    if (storeId) {
      handleShow(storeId)
    }
  }, [storeId])

  // 가게 목록 불러오기 Fetch All Stores Info API
  useEffect(() => {
    ReactGA.initialize('G-P4SP6NH4KM')
    fetchData('https://43.202.3.23:8080/store/list', 'GET', null, null)
  }, [])

  // 가게 목록 저장 Save StoreInfoAPI Data
  useEffect(() => {
    if (data) {
      // setStoreList(dummyData)
      setStoreList(data)
    }
  }, [data])

  // 가게 정보 불러오기 Fetch Store Info API
  useEffect(() => {
    if (getStoreInfoData) {
      setStoreInfo(getStoreInfoData)
      setStoreIcon(getCategoryIcon(getStoreInfoData.category))
      setShow(true)
    }
  }, [getStoreInfoData])

  // useEffect(() => {
  //   if (storeIcon) {
  //     console.log('storeIcon changed-' + storeIcon)
  //   }
  // }, [storeIcon])

  // 모달 뛰우기 Show Store Modal
  const handleShow = (id, name, category) => {
    ReactGA.event({
      name: name,
      id: id,
      page: 'Home',
      category: 'MapClick',
      action: 'Click',
      label: 'map marker click',
    })
    // setStoreIcon(getCategoryIcon(category))

    getStoreInfo(
      `http://43.202.3.23:8080/store?storeId=${id}`, //${id} + id,
      'GET',
      null,
      null,
    )
  }

  const redirectUrl = (urlLink) => {
    window.location.href = urlLink
  }

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
  // 위치 지도에 뛰우기 Render Naver Map
  function MyMap({ storeList, setStoreIcon }) {
    const navermaps = useNavermaps()

    //아이콘
    const getCustomMarkerIcon = (storeName, category, setStoreIcon) => {
      // setStoreIcon(getCategoryIcon(category))
      return {
        content: `<img src="${getCategoryIcon(
          category,
        )}" /><span class="m-1 badge rounded-pill bg-light text-dark me-1 border border-dark ">${storeName}</span>`,
      }
    }

    return (
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.54183, 127.0563)}
        defaultZoom={14}
      >
        {storeList?.map((store, index) => (
          <Marker
            key={index}
            defaultPosition={
              new navermaps.LatLng(store.longitude, store.latitude)
              // new navermaps.LatLng(store.longitude, store.latitude)
            }
            onClick={() => {
              handleShow(store.storeId, store.name, store.category)
            }}
            icon={getCustomMarkerIcon(store.name, store.category, setStoreIcon)}
          />
        ))}
      </NaverMap>
    )
  }

  return (
    <>
      <Container>
        <Content>
          <LinkButtonContainer>
            <Row className="vw-100 px-3">
              <Col className="me-1">
                <LinkButton
                  className="p-1 border border-dark"
                  style={{ borderRadius: '30px' }}
                >
                  <Col className="px-0" xs={3}>
                    <LogoImg src={Logo} />
                    {/* <LogoImg src={BakeryIcon} /> */}
                    {/* <LogoImg src={FashionIcon} /> */}
                  </Col>
                  <Col
                    className="px-0 d-flex justify-content-center align-items-center"
                    style={{ fontSize: '12px' }}
                    onClick={() =>
                      redirectUrl(' https://blog.naver.com/paulssi')
                    }
                  >
                    <strong>폴씨 블로그</strong>
                  </Col>
                  <Col className="" xs={3}>
                    <AiOutlineArrowRight />
                  </Col>
                </LinkButton>
              </Col>
              <Col className="ms-1">
                <LinkButton
                  className="p-1 border border-dark"
                  style={{ borderRadius: '30px' }}
                >
                  <Col className="px-0" xs={3}>
                    <LogoImg src={Logo} />
                  </Col>
                  <Col
                    className="px-0 d-flex justify-content-center align-items-center"
                    style={{ fontSize: '12px' }}
                    onClick={() =>
                      redirectUrl('https://www.instagram.com/paulseee')
                    }
                  >
                    <strong>인스타그램</strong>
                  </Col>
                  <Col className="" xs={3}>
                    <AiOutlineArrowRight />
                  </Col>
                </LinkButton>
              </Col>
            </Row>
          </LinkButtonContainer>
          <MapDiv
            style={{
              width: '100vw',
              height: '100vh',
            }}
          >
            <MyMap storeList={storeList} setStoreIcon={setStoreIcon} />
          </MapDiv>
        </Content>
      </Container>
      <StoreModal
        show={show}
        setShow={setShow}
        storeInfo={storeInfo}
        storeIcon={storeIcon}
      />
    </>
  )
}

export default Home

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const LinkButtonContainer = styled.div`
  position: fixed;
  top: 5%;
  z-index: 1;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`
const LinkButton = styled(Row)`
  background: #ffffff;
  transition: background 0.3s ease;
  &:hover {
    background: blue;
    color: #ffffff;
  }
`
const LogoImg = styled.img`
  height: 20px;
  border-radius: 30px;
`
