import React from 'react'
import CardMain from './CardMain'
import { useSelector } from 'react-redux';

export default function CardSection() {

    let totalIncome = 0;
    let totalExpense = 0;

    // @ts-ignore
    const userData = useSelector((state) => state?.transactions?.transactions)

    if (userData) {
        // @ts-ignore
        userData.forEach(transaction => {
            if (transaction.type === 'INCOME') {
                // @ts-ignore
                totalIncome += transaction.amount;
            }else if (transaction.type === 'EXPENSE') {
                // @ts-ignore
                totalExpense += transaction.amount;
            }
        });
    }

    return (
        <>
            <div className='w-full container h-[20vh] mx-auto flex justify-between mt-10'>
                <CardMain money={totalIncome - totalExpense} title="Money in Wallet" />
                <CardMain title="Total Project" />
                <CardMain money={totalIncome} title="Total Income" />
            </div>
        </>
    )
}
