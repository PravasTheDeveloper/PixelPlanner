import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


export default function CardMain({ title , money }: any) {

    
    return (
        <>
            <Card className='w-[30%]'>
                <CardHeader>
                    <CardTitle>
                        <div className='flex justify-between text-lg'>
                            <p>
                                {title}
                            </p>
                            <p>
                                $
                            </p>
                        </div>

                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-2xl font-bold'>
                        ${money}
                    </p>
                </CardContent>
                <CardFooter>
                    +20.1% from last month
                </CardFooter>
            </Card>
        </>
    )
}
