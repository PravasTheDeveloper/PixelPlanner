import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { id } = req.body

        // console.log(req.body)

        await prisma.$connect()

        const createUser = await prisma.projectAssign.findMany({
            
        })
        // console.log(createUser)
        if (createUser) {
            res.status(200).send(createUser)
        }
    } catch (err) {
        res.status(400).send(err)
    } finally {
        await prisma.$disconnect()
    }
}
