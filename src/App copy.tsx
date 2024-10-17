import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

declare global {
  interface Window {
    kakao: any
  }
}

function App() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=0fe0135121b1f17540f2b08b30e67505'
    script.async = true
    script.onload = () => {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      }
      const map = new window.kakao.maps.Map(container, options)
    }
    document.head.appendChild(script)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div id="map" style={{ width: '500px', height: '500px' }}></div>
    </div>
  )
}

export default App
