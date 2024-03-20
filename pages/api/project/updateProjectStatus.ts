import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { newStatus, developerid, projectid } = req.body

        console.log(newStatus)

        await prisma.$connect()

        const createUser = await prisma.projectAssign.update({
            where: {
                id: projectid
            },
            data: {
                status: newStatus
            }
        })

        if (createUser) {
            res.status(200).send("Hei man")
        }

    } catch (err) {
        res.status(400).send(err)
    } finally {
        await prisma.$disconnect()
    }
}
