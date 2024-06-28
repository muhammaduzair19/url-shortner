import { Facebook, Github, LinkedinIcon } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='p-10 bg-gray-800 mt-10 flex flex-col'>
            <div className='flex gap-5 justify-center'>
                <a href="https://www.facebook.com/muhammaduzair19" target='_blank' className='cursor-pointer text-sm' >
                    <Facebook />
                </a>
                <a href="https://www.linkedin.com/in/muhammaduzair19" target='_blank' className='cursor-pointer text-sm' >
                    <LinkedinIcon />
                </a>
                <a href="https://www.github.com/muhammaduzair19" target='_blank' className='cursor-pointer text-sm' >
                    <Github />
                </a>
            </div>
            <span className='w-full h-[0.1px] opacity-30  bg-gray-400 mt-5' />
            <div className='flex justify-center text-xs mt-2 items-center gap-1'>
                &#169; All rights and copyright reserved by <a href='#'  className='cursor-pointer hover:text-slate-300 text-sm font-semibold'>Uzairdev</a>
            </div>
        </footer>
    )
}

export default Footer;
