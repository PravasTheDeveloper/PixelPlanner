import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await prisma.$connect()

        const createUser = await prisma.user.findMany({})

        if (createUser) {
            res.status(200).send(createUser)
        }
    } catch (err) {
        res.status(400).send(err)
    } finally {
        await prisma.$disconnect()
    }
}
