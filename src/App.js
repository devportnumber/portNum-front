import React, { lazy } from 'react'
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'

const LazyHome = lazy(() => import('../src/pages/Home'))
const LazyAbout = lazy(() => import('../src/pages/About'))
const LazyStore = lazy(() => import('../src/pages/Store'))

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
`

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/event/:storeId" element={<LazyStore />} />
          {/* <Route path="/about" element={<LazyAbout />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
