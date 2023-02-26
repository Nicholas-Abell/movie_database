import React from 'react'
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { user } = UserAuth();
    const navigate = useNavigate();

    if (!user) {
        return navigate('/')
    } else {
        return children;
    }

}

export default ProtectedRoute