import React, { useState, useEffect } from 'react'

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
import { Row, Col } from 'react-bootstrap'
import { AiOutlineArrowRight } from 'react-icons/ai'

// Icons
import BakeryIcon from '../assets/icons/maps/point_22_bakery.svg'
import FashionIcon from '../assets/icons/maps/point_22_fashion.svg'
import BarIcon from '../assets/icons/maps/point_22_bar.svg'
import CafeIcon from '../assets/icons/maps/point_22_cafe.svg'
import GoodsIcon from '../assets/icons/maps/point_22_goods.svg'
import RestaurantIcon from '../assets/icons/maps/point_22_restaurant.svg'
import ExhibitionIcon from '../assets/icons/maps/point_22_exhibition.svg'
import Logo from '../assets/icons/logo/paulseee_logo.png'

// Components
import StoreModal from '../components/Modal'

// Hooks
import { useAxios } from '../hooks/useAxios'

// Utils
import getCategoryIcon from '../utils/getCategoryIcon'

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
    fetchData('http://43.202.3.23:8080/store/list', 'GET', null, null)
  }, [])

  // 가게 목록 저장 Save StoreInfoAPI Data
  useEffect(() => {
    if (data) {
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

  // 위치 지도에 뛰우기 Render Naver Map
  function MyMap({ storeList, setStoreIcon }) {
    const navermaps = useNavermaps()

    //아이콘
    const getCustomMarkerIcon = (storeName, category, setStoreIcon) => {
      return {
        // content: `<img src="${getCategoryIcon(
        //   category,
        // )}" /><span class="bubble left">${storeName}</span>`,
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
          {/* <div class="bubble left"> ut labore et dolore magna </div> */}

          <LinkButtonContainer>
            <Row className="vw-100 px-3">
              <Col className="me-1">
                <LinkButton>
                  <Col
                    className="px-0 d-flex justify-content-center align-items-center"
                    xs={3}
                  >
                    <LogoImg src={Logo} />
                  </Col>
                  <MenuCol
                    onClick={() =>
                      redirectUrl(' https://blog.naver.com/paulssi')
                    }
                  >
                    <strong>폴씨 블로그</strong>
                  </MenuCol>
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    xs={3}
                  >
                    <AiOutlineArrowRight />
                  </Col>
                </LinkButton>
              </Col>
              <Col className="ms-1">
                <LinkButton>
                  <Col
                    className="px-0 d-flex justify-content-center align-items-center"
                    xs={3}
                  >
                    <LogoImg src={Logo} />
                  </Col>
                  <MenuCol
                    onClick={() =>
                      redirectUrl('https://www.instagram.com/paulseee')
                    }
                  >
                    <strong>인스타그램</strong>
                  </MenuCol>
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    xs={3}
                  >
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
  .bubble {
    font-size: 12px;
    --r: 11px;
    --t: 16px;
    max-width: 300px;
    padding: calc(2 * var(--r) / 5);
    -webkit-mask: radial-gradient(var(--t) at var(--_d) 0, #0000 98%, #000 102%)
        var(--_d) 100% / calc(100% - var(--r)) var(--t) no-repeat,
      conic-gradient(at var(--r) var(--r), #000 75%, #0000 0)
        calc(var(--r) / -2) calc(var(--r) / -2) padding-box,
      radial-gradient(50% 50%, #000 98%, #0000 101%) 0 0 / var(--r) var(--r)
        space padding-box;
    background: linear-gradient(135deg, #fe6d00, #1384c5) border-box;
    // background: white;
    // color: black;
    color: #fff;
  }
  .left {
    --_d: 0%;
    border-left: var(--t) solid #0000;
    margin-right: var(--t);
    place-self: start;
  }
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
  padding: 6px;
  border: 1px solid #343a40;
  border-radius: 30px;
  background: #ffffff;
  transition: background 0.3s ease;
  &:hover {
    background: #0971f8;
    color: #ffffff;
  }
`
const LogoImg = styled.img`
  height: 24px;
  border-radius: 30px;
`

const MenuCol = styled(Col)`
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`
