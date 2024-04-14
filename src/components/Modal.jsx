import React, { useState, useEffect, startTransition } from 'react'
import { useNavigate } from 'react-router-dom'

// Google Analytics
import ReactGA from 'react-ga4'

// Bootstrap
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'

// Utils
import getCategoryIcon from '../utils/getCategoryIcon'

// Icons
import ShareIcon from '../assets/icons/modal/icon_blu_18_share.svg'
import DateIcon from '../assets/icons/modal/icon_gry_18_date.svg'
import TimeIcon from '../assets/icons/modal/icon_gry_18_time.svg'
import PinIcon from '../assets/icons/modal/icon_gry_18_pin.svg'

import styled from 'styled-components'

function StoreModal({ show, setShow, storeInfo, storeIcon }) {
  const handleClose = () => setShow(false)
  const navigate = useNavigate()

  const modalDialogStyle = `
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
    border: solid 1px black;
    }
`
  useEffect(() => {
    ReactGA.initialize('G-P4SP6NH4KM')
  }, [])

  const handleClick = (storeId, storeName) => {
    ReactGA.event({
      name: storeName,
      id: storeId,
      page: 'Modal',
      category: 'ClickModal',
      action: 'Click',
      label: 'modal click',
    })
    startTransition(() => {
      navigate(`/paulseee/${storeId}`, {
        state: { storeIcon: storeIcon, storeInfoState: storeInfo },
      })
    })
  }

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

  //share link
  const shareModalLink = (storeId, storeName, event) => {
    event.stopPropagation()

    ReactGA.event({
      name: storeName,
      id: storeId,
      page: 'Modal',
      category: 'ShareLink',
      action: 'Click',
      label: 'share store link click',
    })
    // const linkUrl = `https://portnumber.site/paulseee?id=${storeId}`
    const linkUrl = `${process.env.REACT_APP_BASE_URL}/paulseee?id=${storeId}`
    copyToClipboard(linkUrl)
  }

  return (
    storeInfo && (
      <div>
        <style>{modalDialogStyle}</style>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body
            onClick={() => handleClick(storeInfo.id, storeInfo.name)}
            className="px-4"
          >
            <Row className="mb-2 d-flex align-items-center">
              <Col xs={1} className="pe-0 d-flex align-items-center">
                <IconImg src={getCategoryIcon(storeInfo.category)} />
              </Col>
              <Col className="d-flex align-items-center">
                <StyledName>{storeInfo.name}</StyledName>
              </Col>
              <Col xs={2} className="pe-0 d-flex align-items-center">
                <ShareIconImg
                  src={ShareIcon}
                  onClick={(event) =>
                    shareModalLink(storeInfo.id, storeInfo.name, event)
                  }
                />
              </Col>
            </Row>
            <Row className="mb-0">
              <Row className="pb-1 d-flex align-items-center">
                <Col xs={1} className="pe-0 d-flex align-items-center">
                  <IconImg src={DateIcon} />
                </Col>
                <Col>{storeInfo.dates}</Col>
              </Row>
              <Row className="mb-3 d-flex align-items-center">
                <Col xs={1} className="pe-0 d-flex align-items-center">
                  <IconImg src={TimeIcon} />
                </Col>
                <Col>{storeInfo.time}</Col>
              </Row>
            </Row>
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
            <Row>
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
  font-size: 20px;
`
const ShareIconImg = styled.img`
  height: 20px;
  border-radius: 30px;
`
const IconImg = styled.img`
  height: 20px;
  border-radius: 30px;
`
const TitleCol = styled(Col)`
  padding-left: 0;
  display: flex;
  align-items: center;
`
