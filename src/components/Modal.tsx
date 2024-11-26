import React, { useState, useEffect, startTransition } from 'react'
import { useNavigate } from 'react-router-dom'

// Google Analytics
import ReactGA from 'react-ga4'

// Bootstrap
import { Modal, Row, Col } from 'react-bootstrap'

// Utils
import getCategoryIcon from '../utils/getCategoryIcon'

// Icons
import ShareIcon from '../assets/icons/modal/icon_blu_18_share.svg'
import DateIcon from '../assets/icons/modal/icon_gry_18_date.svg'
import TimeIcon from '../assets/icons/modal/icon_gry_18_time.svg'
// Category Icons
import CHINESE_BLK from '../assets/icons/maps_bw/point_22_chn_blk.svg'
import JAPANESE_BLK from '../assets/icons/maps_bw/point_22_jpn_blk.svg'
import KOREAN_BLK from '../assets/icons/maps_bw/point_22_kor_blk.svg'
import WESTERN_BLK from '../assets/icons/maps_bw/point_22_wst_blk.svg'
import CHINESE_WHT from '../assets/icons/maps_bw/point_22_chn_wht.svg'
import JAPANESE_WHT from '../assets/icons/maps_bw/point_22_jpn_wht.svg'
import KOREAN_WHT from '../assets/icons/maps_bw/point_22_kor_wht.svg'
import RESTAURANT from '../assets/icons/maps_basic/point_22_restaurant.svg'

import styled from 'styled-components'

import { StoreInfo } from '../pages/Home'


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
const getIconForCategory = (category: keyof typeof iconMap): string  => {
  return iconMap[category] || defaultIcon; // returns empty string if no match
};


interface StoreModalProps {
  show: boolean
  setShow: (value: boolean) => void
  storeInfo: StoreInfo | undefined
  storeIcon: string
}

const StoreModal: React.FC<StoreModalProps> = ({
  show,
  setShow,
  storeInfo,
  storeIcon,
}) => {
  const navigate = useNavigate()
  // console.log('storeIcon-' + storeIcon)
  useEffect(() => {
    ReactGA.initialize('G-P4SP6NH4KM')
  }, [])

  if (!storeInfo) {
    return null
  }

  // console.log('StoreModal-' + JSON.stringify(storeInfo))

  const handleClose = () => setShow(false)

  const modalStyle = `
  .modal-body {
  padding: 30px 25px;
  }

  .modal-dialog {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px 10px;
  }
  .modal {
    display: flex !important;
    justify-content: center;
  }
  .modal-content {
    border-radius: 25px;
    border: solid 1.5px black;
    }
`

  const handleClick = (storeId: number, storeName: string, storeDetailInfo:object) => {
    // ReactGA.event({
    //   name: storeName,
    //   id: storeId,
    //   page: 'Modal',
    //   category: 'ClickModal',
    //   action: 'Click',
    //   label: 'modal click',
    // })
    // alert(JSON.stringify(storeDetailInfo))
    startTransition(() => {
      navigate(`/${localStorage.getItem('path')}/${storeId}`, {
        state: { storeIcon: storeIcon, storeInfoState: storeDetailInfo },
      })
    })
  }

  const copyToClipboard = (text: string) => {
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

  //share link
  const shareModalLink = (storeId: number, storeName: string, event: any) => {
    event.stopPropagation()

    // ReactGA.event({
    //   name: storeName,
    //   id: storeId,
    //   page: 'Modal',
    //   category: 'ShareLink',
    //   action: 'Click',
    //   label: 'share store link click',
    // })
    const linkUrl = `${process.env.REACT_APP_BASE_URL}/${localStorage.getItem(
      'path',
    )}?id=${storeId}`

    copyToClipboard(linkUrl)
  }

  return (
    storeInfo && (
      <div>
        <style>{modalStyle}</style>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body
            onClick={() => handleClick(storeInfo.popupId, storeInfo.name, storeInfo)}
          >
            {/************** First Row *************/}
            <Row className="mb-2 d-flex align-items-center">
              <Col xs={1} className="pe-0 d-flex align-items-center">
                <TopRowIcon src={getIconForCategory(storeIcon)} />
                {/* ICON_CHINESE_BLK or 'ICON_'+ storeInfo.category */}
              </Col>
              <Col className="d-flex align-items-center">
                <StyledName>{storeInfo.name}</StyledName>
              </Col>
              <Col xs={2} className="pe-0 d-flex align-items-center">
                <TopRowIcon
                  src={ShareIcon}
                  onClick={(event) =>
                    shareModalLink(storeInfo.popupId, storeInfo.name, event)
                  }
                />
              </Col>
            </Row>
            {/************** Second Row *************/}
            <Row className="mb-1">
              <Row className="">
                <Col xs={1} className="d-flex align-items-center">
                  <IconImg src={DateIcon} />
                </Col>
                <Col className="flex-grow-1">
                  {/* px-0 */}
                  {storeInfo.startDate}-{storeInfo.endDate}
                </Col>
                <AddressCol className="d-flex justify-content-end" xs={4}>
                  {storeInfo.address.region}
                </AddressCol>
              </Row>
              <Row className="mb-3 d-flex align-items-center">
                <Col xs={1} className="pe-0 d-flex align-items-center">
                  <IconImg src={TimeIcon} />
                </Col>
                {/* <Col>{storeInfo.time}</Col> */}
                <Col>time</Col>
              </Row>
            </Row>
            {/************** Keywords *************/}
            <Row>
              <p className="mb-3">
                {storeInfo.keywords?.map((keyword, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill bg-light text-dark me-1 border border-dark"
                  >
                    {keyword}
                  </span>
                ))}
              </p>
            </Row>
            {/************** Description *************/}
            <Row onClick={(e) => e.stopPropagation()}>
              <StyledDescription className="mb-0">
                {storeInfo.description}
              </StyledDescription>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    )
  )
}

export default StoreModal

const StyledDescription = styled.pre`
  line-height: 1.5;
  font-size: 14px;
  white-space: pre-wrap;
`
const StyledName = styled.div`
  line-height: 1.5;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 22px;
`

const TopRowIcon = styled.img`
  height: 28px;
`

const IconImg = styled.img`
  height: 23px;
`

const AddressCol = styled(Col)`
  color: gray;
  font-size: 17px;
`
