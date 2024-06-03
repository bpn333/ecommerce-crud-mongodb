import React from 'react'
import { Route, Routes } from 'react-router-dom'
import home from './pages/home'
import delete_item from './pages/delete_item'
import create_item from './pages/create_item'
import show_item from './pages/show_item'
import edit_item from './pages/edit_item'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<home/>} />
      <Route path='/item/create' element={<create_item/>} />
      <Route path='/item/details/:id' element={<show_item/>} />
      <Route path='/item/edit/:id' element={<edit_item/>} />
      <Route path='/item/delete/:id' element={<delete_item/>} />
    </Routes>
  )
}

export default App