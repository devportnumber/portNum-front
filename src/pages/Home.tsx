import React, { useState, useEffect } from 'react'

// Google Analytics
import ReactGA from 'react-ga4'

// Kakao Map
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'

// Bootstrap
import { Row, Col } from 'react-bootstrap'
import { AiOutlineArrowRight } from 'react-icons/ai'

// Icons
import CHINESE_BLK from '../assets/icons/maps_bw/point_22_chn_blk.svg'
import JAPANESE_BLK from '../assets/icons/maps_bw/point_22_jpn_blk.svg'
import KOREAN_BLK from '../assets/icons/maps_bw/point_22_kor_blk.svg'
import WESTERN_BLK from '../assets/icons/maps_bw/point_22_wst_blk.svg'
import CHINESE_WHT from '../assets/icons/maps_bw/point_22_chn_wht.svg'
import JAPANESE_WHT from '../assets/icons/maps_bw/point_22_jpn_wht.svg'
import KOREAN_WHT from '../assets/icons/maps_bw/point_22_kor_wht.svg'
import RESTAURANT from '../assets/icons/maps_basic/point_22_restaurant.svg'

// Components
import StoreModal from '../components/Modal'
// import HomeMap from '../components/HomeMap'
import SingleMenu from '../components/SingleMenu'

// Hooks
import { useAxios } from '../hooks/useAxios'

// Utils
// import getCategoryIcon from '../utils/getCategoryIcon'

// Styles
import styled from 'styled-components'


const iconMap: Record<string, string> = {
  CHINESE_BLK,
  JAPANESE_BLK,
  KOREAN_BLK,
  WESTERN_BLK,
  CHINESE_WHT,
  JAPANESE_WHT,
  KOREAN_WHT,
  RESTAURANT,
};

const defaultIcon = RESTAURANT; 

export const getIconForCategory = (category: keyof typeof iconMap): string  => {
  return iconMap[category] || defaultIcon; // returns empty string if no match
};

// Interface: store information
interface StoreAddress {
  address: string
  addressDetail: string
  region: string | null
}

interface StoreImage {
  imgId: number
  imgUrl: string
}

interface Points {
  longitude: number
  latitude: number
}

export interface StoreInfo {
  popupId: number
  name: string
  // category: string
  category: keyof typeof iconMap
  startDate: string
  endDate: string
  stat: string
  point: Points
  address: StoreAddress
  description: string
  detailDescription: string
  mapUrl: string | null
  representImgUrl: string
  images: StoreImage[]
  keywords: string[]
}

// Interface: API response
interface ApiResponse<T> {
  data: {
    data: T
  }
}

const Home: React.FC = () => {
  const { fetchData, loading, data, error } =
    useAxios<ApiResponse<StoreInfo[]>>()
  const [storeList, setStoreList] = useState<StoreInfo[] | undefined>(undefined)

  const {
    fetchData: getStoreInfo,
    loading: storeLoading,
    data: storeInfoData,
    error: storeInfoError,
  } = useAxios() // StoreInfo type passed here

  const [show, setShow] = useState<boolean>(false)
  const [storeInfo, setStoreInfo] = useState<StoreInfo | undefined>(undefined)
  const [storeId, setStoreId] = useState<string>('')
  const [nickName, setNickName] = useState<string>(
    localStorage.getItem('path') ?? '',
  )
  const [storeIcon, setStoreIcon] = useState<string>('')

  // Modal sharing
  const queryParameters = new URLSearchParams(window.location.search)
  const storeIdParam = queryParameters.get('id')


// console.log("popup-"+JSON.stringify(localStorage.getItem('path')))



  //Modal Link Show
  useEffect(() => {
    if (storeIdParam) {
      setStoreId(storeIdParam)
    }
  }, [storeIdParam])

  useEffect(() => {
    if (storeId) {
      console.log(storeId)
      handleShow(parseInt(storeId))
    }
  }, [storeId])

  // Fetch All Stores Info API with nickname
  useEffect(() => {
    ReactGA.initialize('G-P4SP6NH4KM')
    // console.log('HOME localStorage nickname-' + nickName)
    if (nickName !== '')
      fetchData(
        `https://api.portnumber.site/admin/popup/api/${nickName}`,
        'GET',
        null,
        null,
      )
  }, [])

  // Save StoreInfoAPI Data
  useEffect(() => {
    if (data) {
      // console.log('POP UP LIST_' + JSON.stringify(data))
      setStoreList(data?.data?.data)
    }
  }, [data])

  // Fetch Store Info API
  useEffect(() => {
    if (storeInfoData) {
      // console.log(JSON.stringify(storeInfoData.data))
      setStoreInfo(storeInfoData.data)
      // setStoreIcon('CHINESE_BLK')
      setStoreIcon(storeInfoData.category)
      setShow(true)
    }
  }, [storeInfoData])

  // Show Store Modal
  const handleShow = (id: number) => {
    //, name?: string, category?: string
    // ReactGA.event({
    //   category: 'MapClick',
    //   action: 'Click',
    //   label: 'map marker click',
    //   value: id ?? null,
    // })

    getStoreInfo(
      `https://api.portnumber.site/admin/popup/api/${nickName}/${id}`,
      'GET',
      null,
      null,
    )
  }

  // speech bubble css
  const popupMarkerStyle = `
  .bubble {
    border-radius: 15px 15px 15px 0px;
    background: white;
    font-size: 12px;
    border: 1px solid #343a40;
    font-weight: 500;
    color: black;
    display: flex;
    align-items: center;
    padding: .7em;
    max-width: 120px;
    transform: translate(38px, -22px);
  }

`

  return (
    <>
      <style>{popupMarkerStyle}</style>
      <Container>
        <Content>
          <SingleMenu />
          <Map // 지도를 표시할 Container
      id="map"
      center={{
        lat: 37.5221,
        lng:  127.045,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={7}
      >

            {storeList?.map((store, index) => (
              <div key={index}>
                <MapMarker
                  position={{
                    lat: store.point?.latitude,
                    lng: store.point?.longitude ,
                    // lat: store.point?.longitude,
                    // lng: store.point?.latitude,
                  }}

                  image={{
                    src: getIconForCategory(store.category), 
                    size: {
                      width: 24,
                      height: 24,
                    },
                  }}
                />
                <CustomOverlayMap
                  position={{
                    lat: store.point?.latitude,
                    lng: store.point?.longitude,
                    // lat: store.point?.longitude,
                    // lng: store.point?.latitude,
                  }}
                  yAnchor={1}
                >
                  <div
                    className="customoverlay bubble"
                    onClick={() => {
                      handleShow(store.popupId)
                    }}
                  >
                    {store.name}
                  </div>
                </CustomOverlayMap>
              </div>
            ))}
          </Map> 
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

{
}

export default Home

const MapContainer = styled(Map)`
  height: 100vh;
`

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
