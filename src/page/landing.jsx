import Accordian from '@/components/accordian'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const LandingPage = () => {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate()

    const handleShorten = (e) => {
        e.preventDefault();

        if (longUrl) navigate(`/auth?createNew=${longUrl}`)
    }


    return (
        <div className='flex flex-col items-center'>
            <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>The only URL Shortner <br /> you'll ever need! 👇 </h2>

            <form
                onSubmit={handleShorten}
                className='flex flex-col sm:h-14 sm:flex-row gap-2 w-full md:w-2/4 justify-between'>
                <Input
                    value={longUrl}
                    type='url'
                    placeholder='Enter your looooooooooooong url'
                    className='h-full flex-1 px-4 py-4'
                    onChange={(e) => setLongUrl(e.target.value)}
                />
                <Button
                    type='submit'
                    className='h-full' variant='destructive'>
                    Shorten!
                </Button>
            </form>

            <img src="/banner1.jpg" alt="Banner" className='w-full my-11 md:px-11' />
            <Accordian />
        </div>
    )
}

export default LandingPage