import React from 'react'

import { Logo, Search, Nav } from 'components'

const Header = ({auth}) => {
  return (
    <div className="header">
        <Logo />
        <Search />
        <Nav  auth={auth} />
    </div>
  )
}

export default Header
