import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-Fetch';
import { logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

const Header = () => {
    const navigate = useNavigate()
    const { user, fetchUser } = UrlState();

    useEffect(() => {
        fetchUser()
    }, [user])

    const { loading, fn: fnLogout } = useFetch(logout)

    return (
        <>
            <div className='w-full flex py-4 justify-between items-center'>
                <Link to={'/'} >
                    <img src="/logo.png" className='h-14' alt="Trimrrr Logo" />
                </Link>
                {!user ? (
                    <Button onClick={() => navigate('/auth')} >
                        Login
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                            <Avatar>
                                <AvatarImage src={user?.user_metadata?.profile_pic} />
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={'/dashboard'} className='flex items-center'>
                                    <LinkIcon className='w-4 h-4 mr-2' />
                                    My Links
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <span
                                    onClick={() => {
                                        fnLogout()
                                            .then(() => {
                                                fetchUser()
                                                navigate('/auth')
                                            })
                                    }}
                                    className='flex items-center'>
                                    <LogOut className='w-4 h-4 mr-2' />
                                    Logout
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                )}
            </div>
            {
                loading && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
            }
        </>

    )
}

export default Header