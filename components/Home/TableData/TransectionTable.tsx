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
import axios from 'axios'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '@/redux/userDataSlice';
import { AppDispatch } from '@/redux/store';
interface UserTransaction {
    id: string;
    email?: string;
    amount?: number;
    reason?: string;
    type: TransactionType;
    date?: Date;
}

enum TransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}


export default function TransectionTable() {

    const { data: session, status } = useSession();
    const router = useRouter();

    const dispatch: AppDispatch = useDispatch();
    // @ts-ignore
    const userData = useSelector((state) => state?.transactions?.transactions)

    useEffect(() => {

        if (session?.user?.email) {

            const email = session?.user.email;

            dispatch(getAllTransactions(email));
        }

    }, [dispatch, session]);


    return (
        <div className='container mx-auto h-[60vh]'>
            <div className='mt-10 w-full h-full border rounded-xl overflow-y-auto'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction Date</TableHead>
                            <TableHead className='text-center'>Resone</TableHead>
                            <TableHead className='text-center'>Amount</TableHead>
                            <TableHead className='text-right'>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            // @ts-ignore
                            userData && userData.map((data, index) => {
                                const dateString = data?.date;
                                // @ts-ignore
                                const date = new Date(dateString);

                                const options = { day: "2-digit", month: "short", year: "numeric" };
                                // @ts-ignore
                                const formattedDate = date.toLocaleDateString("en-BD", options);
                                return (
                                    <TableRow key={index} className={data?.type === "INCOME" ? "bg-teal-200" : "bg-rose-200"}>
                                        <TableCell>{formattedDate}</TableCell>
                                        <TableCell className='text-center'>{data.reason}</TableCell>
                                        <TableCell className='text-center font-semibold'>{`${data.amount} $`}</TableCell>
                                        <TableCell className='text-right font-semibold'>{data.type}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {/* <TableRow className='bg-green-300'>
                            <TableCell>16-10-2024</TableCell>
                            <TableCell className='text-center'>Creatig a Chatbot for Wordpress</TableCell>
                            <TableCell className='text-center'>200 $</TableCell>
                            <TableCell className='text-right'>Income </TableCell>
                        </TableRow> */}
                        {/* <TableRow className='bg-green-300'>
                            <TableCell>16-10-2024</TableCell>
                            <TableCell className='text-center'>Creatig a Chatbot for Wordpress</TableCell>
                            <TableCell className='text-center'>200 $</TableCell>
                            <TableCell className='text-right'>Income </TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
