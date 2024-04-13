import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

//store images
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

// Google Analytics
import ReactGA from 'react-ga4'

// Utils
import copyToClipboard from '../utils/copyToClipboard'

function ControlledCarousel({ imageList, storeInfo, storeId }) {
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
            <StyledImage src={image} />
          </StyledCarouselItem>
        ))}
      </StyledCarousel>

      <StyledCarouselCaption style={{ zIndex: 10 }}>
        <h2>
          <strong>{storeInfo.name} &nbsp;</strong>
          <AiOutlineShareAlt onClick={() => shareStoreLink()} />
        </h2>

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

const StyledImage = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  filter: grayscale(30%) brightness(60%);
`

const StyledCarouselCaption = styled.div`
  max-width: 500px;
  text-align: left;
  top: 55%;
  bottom: 33%;
  position: absolute;
  color: #fff;
  z-index: 7;
`
