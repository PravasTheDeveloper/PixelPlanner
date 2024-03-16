import React from 'react'
import { Combobox } from './Combobox'
import NavbarItems from './NavbarItems'
import { Separator } from '@radix-ui/react-separator'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuDemo } from './DropdownMenuDemo'

export default function NavBarSection() {
    return (
        <>
            <div className='w-full h-[8vh] border-b'>
                <div className="w-full h-full bg-re-400 container mx-auto justify-between flex items-center">
                    <div className='w-auto h-full flex items-center'>
                        <Combobox />
                        <NavbarItems />
                    </div>
                    <DropdownMenuDemo />
                </div>

            </div>

        </>
    )
}
