import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom' 

export default function ProtectedRoute({ children }) {
    let { token } = useSelector((state) => state.userSlice)

    if (token) {
        return children
    }

    
    return <Navigate to="/signin" replace />
}