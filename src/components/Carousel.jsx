import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

// Bootstrap
import Carousel from 'react-bootstrap/Carousel'
import { AiOutlineShareAlt } from 'react-icons/ai'

// Google Analytics
import ReactGA from 'react-ga4'

function ControlledCarousel({ imageList, storeInfo }) {
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

  //복사기능
  const copyToClipboard = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const currentUrl = baseUrl + location.pathname
    const textarea = document.createElement('textarea')
    textarea.value = currentUrl
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    alert('복사가 완료되었습니다.')
    document.body.removeChild(textarea)
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
    copyToClipboard()
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
            <StyledImage className="" src={image} />
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
  filter: grayscale(30%) brightness(70%);
`

const StyledCarouselCaption = styled.div`
  max-width: 500px;
  text-align: left;
  top: 55%;
  bottom: 33%;
  position: absolute;
  color: #fff;
  z-index: 10;
`
