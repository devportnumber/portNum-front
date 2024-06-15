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
import HomeMap from '../components/HomeMap'

// Hooks
import { useAxios } from '../hooks/useAxios'

// Data
//import * as constantsData from '../assets/data/Data'

// Utils
import getCategoryIcon from '../utils/getCategoryIcon'
//import findStoreDetailById from '../utils/findStoreDetail'

import styled from 'styled-components'

function Home() {
  const { fetchData, loading, data, error } = useAxios()
  const {
    fetchData: getStoreInfo,
    loading: storeLoading,
    data: storeInfoData,
    error: storeInfoError,
  } = useAxios()

  const [show, setShow] = useState(false)
  const [storeInfo, setStoreInfo] = useState()
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
    fetchData('https://api.portnumber.site/store/list', 'GET', null, null)
  }, [])

  // 가게 목록 저장 Save StoreInfoAPI Data
  useEffect(() => {
    if (data) {
      // setStoreList(constantsData.storeListData) **Dummy Data Stuff**
      setStoreList(data)
    }
  }, [data])

  // 가게 정보 불러오기 Fetch Store Info API
  useEffect(() => {
    if (storeInfoData) {
      setStoreInfo(storeInfoData)
      setStoreIcon(getCategoryIcon(storeInfoData.category))
      setShow(true)
    }
  }, [storeInfoData])

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
      `https://api.portnumber.site/store?storeId=${id}`,
      'GET',
      null,
      null,
    )

    //**Dummy Data Stuff**
    // const storeDetailData = findStoreDetailById(parseInt(id))
    // setStoreInfo(storeDetailData)
    // setStoreIcon(storeDetailData?.category)
    // setShow(true)
  }

  const redirectUrl = (urlLink) => {
    window.location.href = urlLink
  }

  return (
    <>
      <Container>
        <Content>
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
                      redirectUrl('https://blog.naver.com/paulssi')
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
            <HomeMap
              storeListData={storeList}
              handleShow={handleShow}
              setStoreIcon={setStoreIcon}
            />
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
    border-radius: 15px 15px 15px 0px;
    background: white;
    font-size: 12px;
    padding: 4px;
    margin: 4px;
    border: 1px solid #343a40;
    font-weight: 700;
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
    border: 1px solid #0971f8;
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
