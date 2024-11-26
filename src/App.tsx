import React, { lazy, useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

// Hooks
import { useAxios } from './hooks/useAxios'

const LazyHome = lazy(() => import('../src/pages/Home'))
const LazyStore = lazy(() => import('../src/pages/Store'))
const LazyError = lazy(() => import('../src/pages/Error'))



function App() {
  const { fetchData: fetchNickname, data: fetchNicknameData } = useAxios()

  const [isValidPath, setIsValidPath] = useState<boolean>(true)
  const [pathName, setPathName] = useState<string>('')
  const [param, setParam] = useState<string>('')

  useEffect(() => {
    const totalPathName = window.location.pathname.slice(1) // Remove leading slash
    const parts = totalPathName.split('/')
    if (parts.length > 1) {
      setPathName(parts[0])
      setParam(parts[1])
      localStorage.setItem('path', parts[0])
    } else {
      setPathName(totalPathName)
      localStorage.setItem('path', totalPathName)

    }
    fetchNickname(
      `https://api.portnumber.site/admin/popup/api/${parts[0]}`,
      'GET',
      null,
      null
    )
  }, [])

  useEffect(() => {
    if (fetchNicknameData) {
      if (fetchNicknameData.code!==0) {
        setIsValidPath(false)
        }
      else {
        setIsValidPath(true)
        }
    }
  }, [fetchNicknameData])

  return (
    <BrowserRouter>
      <Routes>
        {isValidPath ? (
          <>
            <Route path={`/:pathName`} element={<LazyHome />} />
            <Route path={`/:pathName/:param`} element={<LazyStore />} />
          </>
        ) : (
          <Route path="/*" element={<LazyError />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
