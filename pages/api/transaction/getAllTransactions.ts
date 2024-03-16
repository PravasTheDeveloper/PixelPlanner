import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { email, amount, reason, type, date } = req.body

        await prisma.$connect()



        const response = await prisma.userTransaction.findMany({
            where: {
                email: email
            },
        });

// console.log(response)
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(401).send("Something went wrong")
        }

        // res.status(200).json({messege : "Transaction add successfull"})
    } catch (err) {
        res.status(400).json({ messege: err })
    } finally {
        await prisma.$disconnect()
    }
}
