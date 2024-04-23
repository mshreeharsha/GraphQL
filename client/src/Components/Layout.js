import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
       <main className='mx-auto' style={{"backgroundColor":"#ffe0f5","minHeight":"89vH"}}>
            {children}
       </main>
    </div>
  )
}

export default Layout

//#f6009c