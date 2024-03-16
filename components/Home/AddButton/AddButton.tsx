"use client"

import React, { useState } from 'react'
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
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AddButton() {
    const router = useRouter()

    const [addDataFeild, setaddDataFeild] = useState(false)
    const [date, setDate] = React.useState<Date>()

    const [datafortransaction, setdatafortransaction] = useState({
        amount: 0,
        reason: "",
        type: "INCOME"
    })

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(e.target.value); // Convert input value to a number
        setdatafortransaction((prevData) => ({ ...prevData, amount }));
    };

    const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reason = e.target.value;
        setdatafortransaction((prevData) => ({ ...prevData, reason }));
    };

    const handleInput = async (e: any) => {
        e.preventDefault()

        if (!date || !datafortransaction.amount || !datafortransaction.type || !datafortransaction.reason) {
            Swal.fire({
                title: "Feild Empty",
                text: "Please fill all the feild",
                icon: "warning"
            });
        } else {
            const response = await axios.post("/api/transaction/transactionadd", { email: "info.pravas.cs@gmail.com", date, amount: datafortransaction.amount, reason: datafortransaction.reason, type: datafortransaction.type })

            if (response.status === 200) {
                // setaddDataFeild(false)
                router.reload()
                Swal.fire({
                    title: "Transaction Added",
                    text: "Your Transaction Add Successfully",
                    icon: "success"
                });
            }
        }
    }

    return (
        <>
            <div className={`w-full h-screen absolute top-0 left-0 bg_lite_black justify-center items-center ${addDataFeild === true ? "flex" : "hidden"}`}>
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Add Transaction</CardTitle>
                        <CardDescription>Add your transactions for calculation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
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
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="reason">Reason</Label>
                                        <Input type="text" id="reason" placeholder="Enter Your Reason" onChange={handleReasonChange} />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-3">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="amount">Amount</Label>
                                        <Input type="number" id="amount" placeholder="Enter Your Amount" onChange={handleAmountChange} />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
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
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between" onClick={handleInput}>
                        <Button>Save Transaction</Button>
                    </CardFooter>
                </Card>

            </div>
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
