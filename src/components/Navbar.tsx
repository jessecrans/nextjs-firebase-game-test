import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='p-4 border-b-2 text-left'>
      <ul>
        <li>
          <Link href='/'>
            Home
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar