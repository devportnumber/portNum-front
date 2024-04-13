import React, { useState, useEffect, startTransition } from 'react'
import { useNavigate } from 'react-router-dom'

// Google Analytics
import ReactGA from 'react-ga4'

// Bootstrap
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { PiMapPinDuotone } from 'react-icons/pi'
import {
  AiTwotoneClockCircle,
  AiTwotoneCalendar,
  AiOutlineShareAlt,
} from 'react-icons/ai'

// Utils
import copyToClipboard from '../utils/copyToClipboard'

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
    border: 1px solid #343a40;
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
            <Row className="mb-1">
              <Col xs={1} className="pe-0">
                <PiMapPinDuotone />
              </Col>
              <Col className="">
                <h5>
                  <strong>
                    {storeInfo.name}
                    <AiOutlineShareAlt
                      onClick={(event) =>
                        shareModalLink(storeInfo.id, storeInfo.name, event)
                      }
                    />
                  </strong>
                </h5>
              </Col>
            </Row>
            <Row className="mb-0">
              <Row className="pb-1">
                <Col xs={1} className="pe-0">
                  <AiTwotoneCalendar />
                </Col>
                <Col className="">{storeInfo.dates}</Col>
              </Row>
              <Row className="mb-4">
                <Col xs={1} className="pe-0">
                  <AiTwotoneClockCircle />
                </Col>
                <Col className="">{storeInfo.time}</Col>
              </Row>
            </Row>
            <Row>
              <p className="mb-2">
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
              <p className="mb-0">
                <small>{storeInfo.description}</small>
              </p>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    )
  )
}

export default StoreModal
