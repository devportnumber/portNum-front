import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

//store images
import BackIconImg from '../assets/icons/icon_back.svg'
import store1Img from '../assets/stores/1.png'
import store2Img from '../assets/stores/2.png'
import store3Img from '../assets/stores/3.png'
import store4Img from '../assets/stores/4.png'
import store5Img from '../assets/stores/5.png'
import store6Img from '../assets/stores/6.png'
import store7Img from '../assets/stores/7.png'
import store8Img from '../assets/stores/8.png'
import store9Img from '../assets/stores/9.png'
import store10Img from '../assets/stores/10.png'

// Bootstrap
import Carousel from 'react-bootstrap/Carousel'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { Row, Col } from 'react-bootstrap'

// Google Analytics
import ReactGA from 'react-ga4'

// Utils
import copyToClipboard from '../utils/copyToClipboard'

// Icons
import ShareIcon from '../assets/icons/modal/icon_blu_18_share.svg'

function ControlledCarousel({ imageList, storeInfo, storeId }) {
  const navigate = useNavigate()

  const carouselStyle = `
    .carousel-inner {
      position: absolute;
      top: 0;
      bottom: 0;
    }
    .carousel-indicators {
      margin-bottom: 0;
    }
    .carousel-caption {
      text-align: left;
      bottom: 0;
      right: 0;
      left: 5%;
    }
    .carousel-control-next,
    .carousel-control-prev  {
      display: none;
    }
  `
  const [index, setIndex] = useState(0)
  var location = useLocation()
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  //상세 페이지 공유하기
  const shareStoreLink = (storeId, storeName, event) => {
    ReactGA.event({
      name: storeName,
      id: storeId,
      page: 'Modal',
      category: 'ShareLink',
      action: 'Click',
      label: 'share store link click',
    })
    const baseUrl = process.env.REACT_APP_BASE_URL
    const currentUrl = baseUrl + location.pathname
    copyToClipboard(currentUrl)
  }
  return (
    <>
      <style>{carouselStyle}</style>
      <StyledCarousel
        activeIndex={index}
        onSelect={handleSelect}
        nextIcon=""
        prevIcon=""
      >
        {imageList.map((image, index) => (
          <StyledCarouselItem key={index}>
            {/* <ImageWrapper> */}
            <StyledImage>
              <img src={image} />
            </StyledImage>
            {/* </ImageWrapper> */}
          </StyledCarouselItem>
        ))}
      </StyledCarousel>
      <BackIconImgStyle
        src={BackIconImg}
        alt=""
        onClick={() => navigate(-1)}
      ></BackIconImgStyle>

      <StyledCarouselCaption style={{ zIndex: 10 }}>
        <Row className="storeTit">
          <Col xs={10}>
            {/* <strong> &nbsp;</strong> */}
            {storeInfo.name}
          </Col>
          <Col xs={2}>
            <IconImg src={ShareIcon} onClick={() => shareStoreLink()} />
          </Col>
        </Row>

        <p>
          {storeInfo.keywords.map((keyword, index) => (
            <span
              key={index}
              className="badge rounded-pill bg-light text-dark me-1 border border-dark"
            >
              {keyword}
            </span>
          ))}
        </p>
      </StyledCarouselCaption>
    </>
  )
}

export default ControlledCarousel

const StyledCarousel = styled(Carousel)`
  max-width: 100%;
  padding: 0;
`
const StyledCarouselItem = styled(Carousel.Item)`
  height: 100%;
`

const ImageWrapper = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`

const StyledImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      360deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
  }
  img {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`

const BackBtn = styled.button`
  position: absolute;
  top: 30px;
  left: 20px;
  z-index: 10;
`

const StyledCarouselCaption = styled.div`
  z-index: 5;
  max-width: 500px;
  text-align: left;
  bottom: 33%;
  position: absolute;
  color: #fff;
  z-index: 7;
  padding: 0;
  padding: 0px 24px;

  .storeTit {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.5;
    color: #fff;
    margin-bottom: 12px;
    align-items: center;
  }
`
const IconImg = styled.img`
  height: 24px;
`

const BackIconImgStyle = styled.img`
  height: 24px;
  width: 24px;
  padding: 0px;
  position: absolute;
  top: 30px;
  left: 20px;
  z-index: 10;
`
