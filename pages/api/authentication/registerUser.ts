import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const {
            email,
            name,
            password,
            position,
            positionId,
            teamleader,
            superadmin,
            teamleaderName
        } = req.body

        await prisma.$connect()

        const createUser = await prisma.user.create({
            data: {
                email,
                name,
                password,
                position,
                positionId,
                teamleader,
                superadmin,
                teamleaderName
            }
        })

        if (createUser) {
            res.status(200).json(createUser)
        }
    } catch (err) {
        res.status(400).send(err)
    } finally {
        await prisma.$disconnect()
    }
}
