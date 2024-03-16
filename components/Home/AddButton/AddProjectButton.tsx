"use client"

import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"


import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2'
import axios from 'axios';
import { useRouter } from 'next/router';
import { AllUserComboBox } from '../NavBar/AllUserComboBox';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { fetchUserProjects } from '@/redux/projectDataSlice';
import { fetchUserDetails } from '@/redux/userSlice';

export default function AddProjectButton() {
    const router = useRouter()

    const dispatch = useDispatch()

    const { data: session } = useSession()

    const [addDataFeild, setaddDataFeild] = useState(false)
    const [startingDate, setstartingDate] = React.useState<Date>()
    const [endingDate, setendingDate] = React.useState<Date>()
    // const [allUserDetails, setallUserDetails] = useState([])
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [valuename, setvaluename] = useState("")

    const [datafortransaction, setdatafortransaction] = useState({
        projectvalue: 0,
        projectname: "",

    })

    const handleProjectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const projectvalue = parseFloat(e.target.value); // Convert input value to a number
        setdatafortransaction((prevData) => ({ ...prevData, projectvalue }));
    };

    const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const projectname = e.target.value;
        setdatafortransaction((prevData) => ({ ...prevData, projectname }));
    };

    const handleDeveloperNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const projectname = e.target.value;
        setdatafortransaction((prevData) => ({ ...prevData, projectname }));
    };


    const handleInput = async (e: any) => {
        e.preventDefault()

        if (!startingDate || !endingDate || !datafortransaction.projectvalue || !value || !datafortransaction.projectname) {
            Swal.fire({
                title: "Feild Empty",
                text: "Please fill all the feild",
                icon: "warning"
            });
        } else {
            const response = await axios.post("/api/project/addProject", {
                projectname: datafortransaction.projectname,
                projectvalue: datafortransaction.projectvalue,
                startingdate: startingDate,
                endingdate: endingDate,
                headdeveloperid: value,
                headdevelopername: valuename
            })

            if (response.status === 200) {
                // @ts-ignore
                dispatch(fetchUserProjects(session?.user.id));
                setaddDataFeild(false)
                Swal.fire({
                    title: "Transaction Added",
                    text: "Your Transaction Add Successfully",
                    icon: "success"
                });
            }
        }

    }

    // @ts-ignore
    const allUserDetails = useSelector(state => state.users.userDetails)
    // console.log(allUserDetails)
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserDetails());
    }, [dispatch]);



    return (
        <>
            <div className={`w-full h-screen absolute top-0 left-0 bg_lite_black justify-center items-center ${addDataFeild === true ? "flex" : "hidden"}`}>
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Add Project</CardTitle>
                        <CardDescription>Make Project Add Your Team</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <Label htmlFor="amount">Starting Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !startingDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {startingDate ? format(startingDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={startingDate}
                                                onSelect={setstartingDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <Label htmlFor="amount">Ending Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !endingDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {endingDate ? format(endingDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={endingDate}
                                                onSelect={setendingDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="projectname">Project Name : </Label>
                                        <Input type="text" id="projectname" placeholder="Enter Your Reason" onChange={handleProjectNameChange} />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="amount">Project Value : </Label>
                                        <Input type="number" id="amount" placeholder="Enter Your Amount" onChange={handleProjectValue} />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="amount">Head Developer : </Label>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between"
                                                >
                                                    {value
                                                        // @ts-ignore
                                                        ? allUserDetails.find((framework) => framework.id === value)?.name
                                                        : "Select Developer..."}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search framework..." className="h-9" />
                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {
                                                            // @ts-ignore
                                                            allUserDetails.map((framework, index) => {
                                                                return (
                                                                    <>
                                                                        <CommandItem
                                                                            key={index}
                                                                            value={
                                                                                // @ts-ignore
                                                                                framework.name}
                                                                            onSelect={(currentValue) => {
                                                                                // @ts-ignore
                                                                                setValue(framework.id)
                                                                                // @ts-ignore
                                                                                setvaluename(framework?.name)
                                                                                setOpen(false)
                                                                            }}
                                                                        >
                                                                            {
                                                                                // @ts-ignore
                                                                                framework.name}
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    // @ts-ignore
                                                                                    value === framework.name ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem >
                                                                    </>
                                                                )
                                                            }

                                                            )}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                {/* <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Type</Label>
                                    <div className="flex flex-col space-y-1.5 border h-10 rounded-md justify-center items-center">

                                        <DropdownMenu>
                                            <DropdownMenuTrigger className='w-full h-full'>{datafortransaction.type}</DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Status</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => { setdatafortransaction({ ...datafortransaction, type: "INCOME" }) }}>INCOME</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { setdatafortransaction({ ...datafortransaction, type: "EXPENSE" }) }}>EXPENSE</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div> */}
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between"
                        onClick={handleInput}
                    >
                        <Button>Save Transaction</Button>
                    </CardFooter>
                </Card>

            </div >
            <Button className='w-12 h-12 absolute rounded-full overflow-hidden bottom-10 right-10 flex justify-center items-center text-white cursor-pointer p-0' onClick={() => { setaddDataFeild(!addDataFeild) }}>
                {
                    addDataFeild == false ?
                        <div className='w-full h-full text-4xl flex justify-center items-center'>
                            <IoMdAdd />
                        </div> :
                        <div className='w-full h-full text-4xl flex justify-center items-center bg-rose-300'>
                            <RxCross2 />
                        </div>
                }
            </Button>
        </>
    )
}
