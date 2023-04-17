import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import SideBar from '../ManageProducts/SideBar'

function ProductLayout() {
  return (
    <>
    <div>

    <Outlet/>

  </div>
    
    </>
  )
}

export default ProductLayout