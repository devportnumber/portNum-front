import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

//Bootstrap
import { Row, Col } from 'react-bootstrap'

// Icons
import Logo from '../assets/icons/logo/portnumber_logo_square.png'
import ArrowRight from '../assets/icons/icon_blk_18_arrow.svg'

function SingleMenu({}) {
  const redirectUrl = (urlLink: string) => {
    window.location.href = urlLink
  }

  return (
    <>
      <LinkButtonContainer>
        <Row className="vw-100 px-3">
          <Col className="me-1">
            <LinkButton>
              <Col
                className="ps-1 pe-2 d-flex justify-content-left align-items-center"
                xs={1}
              >
                <LogoImg src={Logo} />
              </Col>
              <MenuCol
                onClick={() => redirectUrl('https://blog.naver.com/paulssi')}
              >
                포트넘버 흑백요리사 지점찾기
              </MenuCol>
              <Col
                className="d-flex justify-content-end align-items-center"
                xs={2}
              >
                <RightArrowImg src={ArrowRight} />
              </Col>
            </LinkButton>
          </Col>
        </Row>
      </LinkButtonContainer>
    </>
  )
}

export default SingleMenu

const LinkButtonContainer = styled.div`
  position: fixed;
  top: 8%;
  z-index: 3;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

const LinkButton = styled(Row)`
  padding: 8px 6px;
  border: 1px solid #343a40;
  border-radius: 30px;
  background: #ffffff;
  transition: background 0.3s ease;
  &:hover {
    // background: #0971f8;
    border: 1px solid #0971f8;
    color: #ffffff;
  }
`
const LogoImg = styled.img`
  height: 37px;
  border-radius: 30px;
`

const RightArrowImg = styled.img`
  height: 24px;
`

const MenuCol = styled(Col)`
  padding-left: 20px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
`
