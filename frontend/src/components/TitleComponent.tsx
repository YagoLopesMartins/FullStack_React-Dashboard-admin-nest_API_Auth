import React from 'react'

interface TitleComponentProps {
    children?: React.ReactNode
}

const TitleComponent: React.FC<TitleComponentProps> = ({ children }) => {
    return <h1 className="text-black font-bold text-3xl">{children}</h1>
}

export default TitleComponent
