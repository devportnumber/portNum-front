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
import Logo from '../assets/icons/logo/paulseee_logo.png'

// Components
import StoreModal from '../components/Modal'

// Hooks
import { useAxios } from '../hooks/useAxios'

import styled from 'styled-components'

function Home() {
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
  const storeListDummy = [
    {
      id: '1',
      category: 'fashion',
      dates: '24.04.29 ~ 42.03.29',
      time: '목요일 12:00 ~ 6:00',
      name: 'Shop Name 1',
      longitude: '37.3595704',
      latitude: '127.105399',
      address: '서울 강남구 강남대로',
      address_detail: '1-1',
      neighborhood: '서울 강남구',
      keywords: ['shop', 'retail'],
      description: 'Shop Description 1',
      images: [
        'https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2395&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1562280963-8a5475740a10?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1485518882345-15568b007407?q=80&w=2542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      regdt: '2024-03-17',
    },
    {
      id: '2',
      category: 'bar',
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
    },
    {
      id: '3',
      category: 'goods',
      dates: '24.04.29 ~ 42.03.29',
      time: '목요일 12:00 ~ 6:00',
      name: 'Cafe Name33',
      longitude: '37.3595704',
      latitude: '127.115399',
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
    },
  ]

  //모달 공유
  const queryParameters = new URLSearchParams(window.location.search)
  const storeIdParam = queryParameters.get('id')
  useEffect(() => {
    //localhost:3000/?id=9
    http: if (storeIdParam) {
      setStoreId(storeIdParam)
    }
  }, [storeIdParam])

  useEffect(() => {
    //localhost:3000/?id=9
    if (storeId) {
      console.log('storeId-' + storeId)
      handleShow(storeId)
    }
  }, [storeId])

  // 가게 목록 불러오기 Fetch All Stores Info API
  useEffect(() => {
    ReactGA.initialize('G-P4SP6NH4KM')
    fetchData('https://jsonplaceholder.typicode.com/todos', 'GET', null, null)
  }, [])

  // 가게 목록 저장 Save StoreInfoAPI Data
  useEffect(() => {
    // console.log('data-' + JSON.stringify(data))
    if (data) setStoreList(storeListDummy)
  }, [data])

  // 가게 정보 불러오기 Fetch Store Info API
  useEffect(() => {
    console.log('getStoreInfoData-' + JSON.stringify(getStoreInfoData))
    if (getStoreInfoData) {
      // setStoreInfo(getStoreInfoData)
      setStoreInfo(storeDummy)
      setShow(true)
    }
  }, [getStoreInfoData])

  // 모달 뛰우기 Show Store Modal
  const handleShow = (id, name) => {
    ReactGA.event({
      name: name,
      id: id,
      page: 'Home',
      category: 'MapClick',
      action: 'Click',
      label: 'map marker click',
    })

    getStoreInfo(
      `https://jsonplaceholder.typicode.com/todos/${id}`, //${id} + id,
      'GET',
      null,
      null,
    )
  }

  const redirectUrl = (urlLink) => {
    window.location.href = urlLink
  }

  // 위치 지도에 뛰우기 Render Naver Map
  function MyMap({ storeList }) {
    const navermaps = useNavermaps()

    //아이콘
    const getCustomMarkerIcon = (storeName, category) => {
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
      setStoreIcon(categoryIcon)
      return {
        content: `<img src="${categoryIcon}" /><span class="m-1 badge rounded-pill bg-light text-dark me-1 border border-dark">${storeName}</span>`,
      }
    }

    return (
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={13}
      >
        {storeList?.map((store, index) => (
          <Marker
            key={index}
            defaultPosition={
              new navermaps.LatLng(store.longitude, store.latitude)
            }
            onClick={() => {
              console.log('Marker clicked:', store.id)
              handleShow(store.id, store.name)
            }}
            icon={getCustomMarkerIcon(store.name, store.category)}
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
                  className="p-1 py-2 border border-dark"
                  style={{ borderRadius: '30px' }}
                >
                  <Col className="px-0" xs={3}>
                    <LogoImg src={Logo} />
                  </Col>
                  <Col className="px-0">
                    <strong>폴씨 블로그</strong>
                  </Col>
                  <Col className="" xs={3}>
                    <AiOutlineArrowRight />
                  </Col>
                </LinkButton>
              </Col>
              <Col className="ms-1">
                <LinkButton
                  className="p-1 py-2 border border-dark"
                  style={{ borderRadius: '30px' }}
                >
                  <Col className="px-0" xs={3}>
                    <LogoImg src={Logo} />
                  </Col>
                  <Col
                    className="px-0"
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
            <MyMap storeList={storeList} />
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
