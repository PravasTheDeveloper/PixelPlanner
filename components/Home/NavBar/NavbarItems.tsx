import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function NavbarItems() {
    
    const router = useRouter().route

    // console.log(router)

    return (
        <>
            <div className='w-auto h-full flex items-center font-semibold ml-5 text-slate-700'>
                <div className='text-sm font-normal border w-auto h-10 rounded-md flex justify-between items-center px-3'>
                    <Link href={"/"} className={`mr-5  px-2 py-1 rounded-md cursor-pointer ${router === "/" ? "bg-slate-600 text-white" : "bg-slate-200"}  `}>
                        Home
                    </Link>
                    <Link href={"/projects"} className={`mr-5  px-2 py-1 rounded-md cursor-pointer ${router === "/projects" ? "bg-slate-600 text-white" : "bg-slate-200"}  `}>
                        Projects
                    </Link>
                    <div className='mr-5 bg-slate-200 px-2 py-1 rounded-md cursor-pointer'>
                        Home
                    </div>
                    <div className='bg-slate-200 px-2 py-1 rounded-md cursor-pointer'>
                        Home
                    </div>
                </div>
            </div>

        </>
    )
}
