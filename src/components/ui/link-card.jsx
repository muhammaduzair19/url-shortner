import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import { Copy, Download, Trash } from 'lucide-react'
import useFetch from '@/hooks/use-Fetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'

const LinkCard = ({ url, fetchUrls }) => {
    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title
        const anchor = document.createElement('a');

        anchor.href = imageUrl;
        anchor.download = fileName;
        anchor.target = '_blank'
        document.body.appendChild(anchor)

        anchor.click();
        document.body.removeChild(anchor)
    }

    const { loading: deleteLoading, fn: fnDelete } = useFetch(deleteUrl, url?.id);




    return (
        <div className='flex flex-col md:flex-row gap-5 border p-4 bg-slate-900 rounded-lg'>
            <img src={url?.qr} className='w-32 object-contain ring ring-blue-300 self-start' alt="qr image" />
            <Link to={`/link/${url?.id}`} className='flex flex-col'>
                <span className='font-extrabold text-3xl hover:underline text-white cursor-pointer'>{url?.title}</span>
                <span className='font-semibold text-2xl hover:underline text-blue-500 cursor-pointer'>
                    https://hsdh.in/{url?.custom_url ? url?.custom_url : url?.short_url}
                </span>
                <span className='flex items-center gap-1 hover:underline cursor-pointer'>
                    {url?.original_url}
                </span>
                <span className='flex items-end font-extralight text-sm flex-1'>
                    {new Date(url?.created_at).toString()}
                </span>
            </Link>
            <div className='w-full flex justify-end '>
                <Button variant='ghost'
                    onClick={() => {
                        navigator.clipboard.writeText('https://hsdh.in/' + url?.short_url)
                    }}
                >
                    <Copy />
                </Button>
                <Button variant='ghost' onClick={downloadImage}>
                    <Download />
                </Button>
                <Button variant='ghost' onClick={() => fnDelete().then(() => fetchUrls())}>
                    {deleteLoading ? <BeatLoader size={5} color='white' /> : <Trash />}
                </Button>
            </div>
        </div>
    )
}

export default LinkCard