import React from 'react'
import Header from './Header'
import Footer from './Footer'

const App = ({ children }) => {
    return <div id="app">
        <Header />
        <div id="content">
            {children}
        </div>
        <Footer />
    </div>
}

export default App
