import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

//Bootstrap
import { Row, Col } from 'react-bootstrap'

// Icons
import { AiOutlineArrowRight } from 'react-icons/ai'
import Logo from '../assets/icons/logo/paulseee_logo.png'

function DoubleMenu({}) {
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
                className="px-0 d-flex justify-content-center align-items-center"
                xs={3}
              >
                <LogoImg src={Logo} />
              </Col>
              <MenuCol
                onClick={() => redirectUrl('https://blog.naver.com/paulssi')}
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
    </>
  )
}

export default DoubleMenu

const LinkButtonContainer = styled.div`
  position: fixed;
  top: 5%;
  z-index: 3;
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
