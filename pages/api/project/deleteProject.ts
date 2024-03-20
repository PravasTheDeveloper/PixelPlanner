import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { projectid } = req.body

        await prisma.$connect()

        const deleteMainProejct = await prisma.projects.delete({
            where: {
                id: projectid
            }
        })

        if (deleteMainProejct) {
            const createUser = await prisma.projectAssign.deleteMany({
                where: {
                    projectid: projectid
                }
            })


            if (createUser) {
                res.status(200).send("Hei man")
            }
        }

    } catch (err) {
        res.status(400).send(err)
    } finally {
        await prisma.$disconnect()
    }
}
