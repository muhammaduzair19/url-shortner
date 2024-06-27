import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '@/context';

const Header = () => {
    const navigate = useNavigate()
    const { user, fetchUser } = UrlState();

    useEffect(() => {
        fetchUser()
        console.log(user?.user_metadata);
    }, [user])
    return (
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
                            <span>
                                <LinkIcon className='w-4 h-4 mr-2' />
                            </span>
                            My Links
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <span>
                                <LogOut className='w-4 h-4 mr-2' />
                            </span>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            )}
        </div>
    )
}

export default Header