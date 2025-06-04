import React from 'react'
import ItemPanel from '../Common/ItemPanel'
import Navbar from '../Common/Navbar'

const index = () => {
  return (
    <div className="page_section">
        <Navbar />
        <ItemPanel pageTitle="Completed Items" filteredCompleted={true}/>
    </div>
  )
}

export default index
