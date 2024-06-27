import { UrlState } from '@/context';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

export default function RequiredAuth({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated, loading, fetchUser } = UrlState();

    useEffect(() => {
        fetchUser()
        if (!isAuthenticated && loading === false) navigate('/auth')
    }, [isAuthenticated, loading]);

    if (loading) return <BarLoader width={'100%'} color='#36d7b7' />

    if (isAuthenticated) return children;
}
