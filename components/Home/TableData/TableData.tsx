import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { fetchUserProjects } from '@/redux/projectDataSlice';
import { RootState } from '@/redux/store';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IoMdAddCircle } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function TableData() {

    const router = useRouter()

    const dispatch = useDispatch()
    const [date, setDate] = React.useState<Date>()
    const { data: session } = useSession()
    const [changeUserData, setchangeUserData] = useState({})
    const [UserDataChangePenel, setUserDataChangePenel] = useState(false)

    const [updateendingdate, setupdateendingdate] = useState(false)
    const [updatedevelopers, setupdatedevelopers] = useState(false)

    const handleChange = async (newStatus: any) => {
        const changePendingWork = await axios.post("",)
    };


    const userData = useSelector((state: RootState) => state.projects.userProjects);
    const userProjectAdding = useSelector((state: RootState) => state.users.userDetails);

    useEffect(() => {
        // @ts-ignore
        if (session?.user.id) {
            // @ts-ignore
            dispatch(fetchUserProjects(session?.user.id));
        }
    }, [dispatch, session]);

    const [formattedDatestarting, setFormattedDateStarting] = useState("");
    const [formattedDateEnding, setFormattedDateEnding] = useState("");
    const [alldevelopertotheproject, setalldevelopertotheproject] = useState([])

    const findUserProjectPath = async (id: any) => {
        // @ts-ignore
        const checkUserAdmin = userProjectAdding.find(datamanage => datamanage.id === session.user.id)

        // @ts-ignore
        if (checkUserAdmin.superadmin === true || checkUserAdmin.teamleader === true) {

            // @ts-ignore
            const chageData = userData.find(data => data.id === id)
            // @ts-ignore
            setchangeUserData(chageData)
            setUserDataChangePenel(true)
            // @ts-ignore
            const timestamp = chageData.startingdate;
            const date = new Date(timestamp);

            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            // @ts-ignore
            setFormattedDateStarting(date.toLocaleDateString('en-US', options));
            // @ts-ignore
            const timestamp2 = chageData.endingdate;
            const date2 = new Date(timestamp2);

            const options2 = { day: 'numeric', month: 'short', year: 'numeric' };
            // @ts-ignore
            setFormattedDateEnding(date2.toLocaleDateString('en-US', options));
            // @ts-ignore

            const responsefindusersinproject = await axios.post("/api/project/findUserByProject", { projectid: chageData?.projectid })

            setalldevelopertotheproject(responsefindusersinproject.data)
        }

    }

    const [addingDeveloperToProjectDetails, setaddingDeveloperToProjectDetails] = useState({
        projectname: "",
        projectvalue: 0,
        startingdate: "",
        endingdate: "",
        headdeveloperid: "",
        headdevelopername: "",
        projectid: "",
        developername: "Select Developer",
        developerid: "",
    })

    // console.log(userData)

    const handleAddToProject = async () => {
        const response = await axios.post("/api/project/assignProjectUser", addingDeveloperToProjectDetails)

        if (response.status === 200) {
            router.reload()
        } else if (response.status === 202) {
            Swal.fire({
                title: "Error to add",
                text: "This user Already added",
                icon: "error"
            });
        }
    }

    return (
        <>

            <div className='container mx-auto h-[60vh]'>
                <div className='mt-10 w-full h-full border rounded-xl overflow-y-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Starting Date</TableHead>
                                <TableHead className='text-center'>Ending Date</TableHead>
                                <TableHead className='text-center'>Work</TableHead>
                                <TableHead className='text-center'>Head Developer</TableHead>
                                <TableHead className='text-center'>Amount</TableHead>
                                <TableHead className='text-center'>Status</TableHead>
                                <TableHead className='text-right'>Payment Profile</TableHead>
                            </TableRow>
                        </TableHeader>
                        {/* <TableBody>
                            {userData.length > 0 ?
                                userData.map((data, index) => {
                                    console.log(session?.user.id)
                                    // @ts-ignore
                                    const timestamp = data.startingdate;
                                    const date = new Date(timestamp);

                                    const options = { day: 'numeric', month: 'short', year: 'numeric' };
                                    // @ts-ignore
                                    const formattedDate = date.toLocaleDateString('en-US', options);

                                    // @ts-ignore
                                    const timestamptwo = data.endingdate;
                                    const datetwo = new Date(timestamptwo);


                                    // @ts-ignore
                                    const formattedDatetwo = datetwo.toLocaleDateString('en-US', options);
                                    return (
                                        <>
                                            <TableRow key={index} className={
                                                // @ts-ignore
                                                `${data.paymentstatus === "PAID" ? "bg-teal-200" : null}`}>
                                                <TableCell
                                                    className='cursor-pointer'
                                                    onClick={() => { // @ts-ignore
                                                        findUserProjectPath(data.id)
                                                    }}
                                                >

                                                    <div className={`w-4 h-4 ${// @ts-ignore
                                                        data.status === "PENDING" ? "bg-yellow-400" : data.status === "WORKING" ? "bg-cyan-400" : "bg-green-400"} rounded-full`}>

                                                    </div>
                                                </TableCell>
                                                <TableCell onClick={() => { // @ts-ignore
                                                    findUserProjectPath(data.id)
                                                }}>{formattedDate}</TableCell>
                                                <TableCell className='text-center cursor-pointer' onClick={() => { // @ts-ignore
                                                    findUserProjectPath(data.id)
                                                }}
                                                >{formattedDatetwo}</TableCell>
                                                <TableCell className='text-center cursor-pointer' onClick={() => { // @ts-ignore
                                                    findUserProjectPath(data.id)
                                                }}
                                                >{// @ts-ignore
                                                        data.projectname}</TableCell>
                                                <TableCell className='text-center cursor-pointer'
                                                    onClick={() => { // @ts-ignore
                                                        findUserProjectPath(data.id)
                                                    }}>{// @ts-ignore
                                                        data.headdevelopername}</TableCell>
                                                <TableCell className='text-center cursor-pointer'
                                                    onClick={() => { // @ts-ignore
                                                        findUserProjectPath(data.id)
                                                    }}>{// @ts-ignore
                                                        data.projectvalue} $</TableCell>
                                                <TableCell className='text-center font-bold'>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>{// @ts-ignore
                                                            data.status}</DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel>Status</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleChange("Pending")}>Pending</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleChange("Working")}>Working</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleChange("Done")}>Done</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                                <TableCell className='text-right font-bold'>
                                                    {// @ts-ignore
                                                        data.paymentstatus}
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                }) :
                                <TableRow className='bg-red-500 w-full'>
                                    <TableCell>No Data Available</TableCell>

                                </TableRow>
                            }

                        </TableBody> */}

                        <TableBody>
                            {userData.length > 0 ?
                                userData.map((data, index) => {
                                    const timestamp = data.startingdate;
                                    const date = new Date(timestamp);
                                    const options = { day: 'numeric', month: 'short', year: 'numeric' };
                                    const formattedDate = date.toLocaleDateString('en-US', options);

                                    const timestamptwo = data.endingdate;
                                    const datetwo = new Date(timestamptwo);
                                    const formattedDatetwo = datetwo.toLocaleDateString('en-US', options);

                                    const projectAllValue = userData.filter((datatwo)=>datatwo.projectid == data.projectid)

                                    var statuspending = 0
                                    var statusworking = 0
                                    var statusdone = 0

                                    projectAllValue.forEach(element => {
                                        if(element.status === "PENDING"){
                                            statuspending = statuspending+1;
                                        }else if(element.status === "WORKING"){
                                            statusworking = statusworking+1;
                                        }else if(element.status === "DONE"){
                                            statusdone = statusdone+1;
                                        }
                                    });

                                    // console.log(projectAllValue)
                                    // console.log(data.projectid)

                                    if (data.developerid === session?.user.id) { // Check if userData.id === id
                                        return (
                                            <TableRow key={index} className={`${data.paymentstatus === "PAID" ? "bg-teal-200" : null}`}>
                                                <TableCell className='cursor-pointer' onClick={() => findUserProjectPath(data.id)}>
                                                    {
                                                        
                                                    }
                                                    <div className={`w-4 h-4 ${statuspending > statusworking && statusdone < statuspending ? "bg-yellow-400" : statusworking > 0 ? "bg-cyan-400" : "bg-green-400"} rounded-full`}></div>
                                                </TableCell>
                                                <TableCell onClick={() => findUserProjectPath(data.id)}>{formattedDate}</TableCell>
                                                <TableCell className='text-center cursor-pointer' onClick={() => findUserProjectPath(data.id)}>{formattedDatetwo}</TableCell>
                                                <TableCell className='text-center cursor-pointer' onClick={() => findUserProjectPath(data.id)}>{data.projectname}</TableCell>
                                                <TableCell className='text-center cursor-pointer' onClick={() => findUserProjectPath(data.id)}>{data.headdevelopername}</TableCell>
                                                <TableCell className='text-center cursor-pointer' onClick={() => findUserProjectPath(data.id)}>{data.projectvalue} $</TableCell>
                                                <TableCell className='text-center font-bold'>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>{data.status}</DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel>Status</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleChange("Pending")}>Pending</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleChange("Working")}>Working</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleChange("Done")}>Done</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                                <TableCell className='text-right font-bold'>{data.paymentstatus}</TableCell>
                                            </TableRow>
                                        );
                                    } else {
                                        return null; // If condition doesn't match, return null
                                    }
                                }) :
                                <TableRow className='bg-red-500 w-full'>
                                    <TableCell>No Data Available</TableCell>
                                </TableRow>
                            }
                        </TableBody>

                    </Table>
                </div>
            </div>

            <div className={`w-full h-screen absolute z-50 top-0 left-0 bg_lite_black ${UserDataChangePenel === true && changeUserData ? "flex" : "hidden"} justify-center items-center`}>
                <Card className="w-auto">
                    <CardHeader>
                        <CardTitle>Project Auth</CardTitle>
                        <CardDescription>Update Details as need for your project</CardDescription>
                    </CardHeader>
                    <div className='w-full h-full flex'>
                        <div className='px-5 capitalize'>
                            <CardContent>
                                <Label className='font-semibold'>Project Name</Label>
                                <p className='mt-1'>{
                                    // @ts-ignore
                                    changeUserData.projectname}</p>
                            </CardContent>
                            <CardContent>
                                <Label className='font-semibold'>Project Starting Date</Label>
                                <p className='mt-1'>{formattedDatestarting}</p>
                            </CardContent>
                            <CardContent>
                                <Label className='font-semibold'>Project Endign Date</Label>
                                <p className='mt-1 flex'>{formattedDateEnding} <span className='text-xl ml-3 cursor-pointer text-slate-400 duration-200 hover:text-cyan-500' onClick={() => { setupdateendingdate(!updateendingdate) }}><FiEdit /></span></p>
                            </CardContent>
                            <CardContent>
                                <Label className='font-semibold'>Project Value</Label>
                                <p className='mt-1'>{// @ts-ignore
                                    changeUserData.projectvalue} $</p>
                            </CardContent>
                            <CardContent>
                                <Label className='font-semibold'>Project Head Developer</Label>
                                <p className='mt-1'>{// @ts-ignore
                                    changeUserData.headdevelopername}</p>
                            </CardContent>
                        </div>
                        <div className='px-5'>
                            <CardContent>
                                <Label className='flex items-center mb-3'>Developers <span className='text-xl ml-3 cursor-pointer text-slate-400 duration-200 hover:text-cyan-500'><IoMdAddCircle /></span></Label>
                                <ul className='list-disc'>
                                    {
                                        alldevelopertotheproject.map((data, key) => {
                                            return (
                                                <li key={key}>{// @ts-ignore
                                                    data.developername}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </CardContent>
                            <CardContent>
                                <Label>Status</Label>
                                <div className='w-[100px] mt-2 text-center'>
                                    {// @ts-ignore
                                        changeUserData.status === "PENDING" ? <p className='bg-yellow-400 px-2 py-1 rounded-full'>PENDING</p> : changeUserData.status === "WORKING" ? <p className='bg-cyan-400 px-2 py-1 rounded-full'>WORKING</p> : <p className='bg-green-400 px-2 py-1 rounded-full'>Done</p>}
                                </div>
                            </CardContent>
                            <CardContent>
                                <Label>Payment</Label>
                                <div className='w-[100px] mt-2 text-center'>
                                    {// @ts-ignore
                                        changeUserData.paymentstatus === "PENDING" ? <p className='bg-yellow-400 px-2 py-1 rounded-full'>PENDING</p> : <p className='bg-green-400 px-2 py-1 rounded-full'>PAID</p>}
                                </div>
                            </CardContent>
                            <CardContent>

                            </CardContent>
                        </div>
                        <div className='px-10 border-l'>
                            <CardContent>
                                <Label className='flex items-center mb-3'>Developers</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='w-full h-full'>{addingDeveloperToProjectDetails.developername}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {
                                            userProjectAdding.map((data, index) => {

                                                return (

                                                    <>
                                                        <DropdownMenuItem onClick={() => {
                                                            console.log(changeUserData)
                                                            setaddingDeveloperToProjectDetails({ // @ts-ignore
                                                                ...addingDeveloperToProjectDetails, projectname: changeUserData.projectname, projectvalue: changeUserData.projectvalue, startingdate: changeUserData.startingdate, endingdate: changeUserData.endingdate, developername: data.name, developerid: data.id, headdeveloperid: changeUserData.headdeveloperid, headdevelopername: changeUserData.headdevelopername, projectid: changeUserData.projectid
                                                            })
                                                        }}>{// @ts-ignore
                                                                data.name}</DropdownMenuItem>
                                                        {/* <SelectItem value="apple" onClick={() => handleAddToProject(data.id, data.name, changeUserData.headdevelopername, changeUserData.headdeveloperid)}></SelectItem> */}
                                                    </>

                                                )
                                            })
                                        }
                                        {/* aria-checked */}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button className='mt-10' onClick={handleAddToProject}>
                                    Add To Project
                                </Button>
                            </CardContent>

                        </div>
                        <div className={`pl-10 border-l w-[350px] relative ${updateendingdate === false ? "hidden" : null}`}>
                            <div onClick={() => { setupdateendingdate(false) }} className='w-6 h-6 rounded-full text-white flex justify-center items-center text-lg absolute right-[20px] cursor-pointer top-[-10px] bg-rose-400'>
                                <RxCross2 />
                            </div>
                            <CardContent>
                                <Label className='flex items-center mb-3'>Update Ending Date</Label>
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <Label htmlFor="amount">Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div>
                                    <Button>
                                        Update Date
                                    </Button>
                                </div>
                            </CardContent>
                        </div>

                    </div>


                    <CardFooter className=''>
                        <div>
                            <Label>Update Payment Option</Label><br />
                            <div className='mt-2 mb-3'>
                                <Button>
                                    Paid
                                </Button>
                            </div>
                            <Label className=''>Delete Project</Label><br />
                            <div className='mt-2'>
                                <Button className='bg-rose-500'>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
