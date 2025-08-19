import React from 'react'
import Sidebar from '../components/Sidebar.tsx'
import Header from '../components/Header.tsx'

interface LayoutProps {
    children?: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden md:flex-row min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    )
}

export default Layout
