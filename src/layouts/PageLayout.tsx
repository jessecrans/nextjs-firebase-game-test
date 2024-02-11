import React from 'react'

const PageLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main className='p-4 text-center'>
      {children}
    </main>
  )
}

export default PageLayout