import React from 'react'
import View from '../../react/View'

const Sidebar = View(() => (
  <aside
    style={{
      padding: '5px',
      width: '200px',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      borderRight: '1px solid gray'
    }}
  >
    <h2>Sidebar</h2>
    <p>
      This is the sidebar...
    </p>
  </aside>
))

export default Sidebar
