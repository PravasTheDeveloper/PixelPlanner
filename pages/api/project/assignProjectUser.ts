import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {

        const {
            projectname,
            projectvalue,
            startingdate,
            endingdate,
            headdeveloperid,
            headdevelopername,
            projectid,
            developername,
            developerid
        } = req.body

        await prisma.$connect()

        const paymentstatus = "PENDING"
        const headdeveloperauthstatus = "PENDING"
        const status = "PENDING"

        const checkIfUserAlredayExists = await prisma.projectAssign.findFirst({
            where: {
                headdeveloperid: developerid
            }
        })

        const checkIfDeveloperUserAlredayExists = await prisma.projectAssign.findFirst({
            where: {
                developerid: developerid
            }
        })

        if (checkIfUserAlredayExists?.headdeveloperid === headdeveloperid || checkIfDeveloperUserAlredayExists?.developerid === developerid) {
            res.status(202).json({messege:"HeadDeveloper Already Added "})
        } else {
            const createUser = await prisma.projectAssign.create({
                data: {
                    projectname,
                    projectvalue,
                    startingdate,
                    endingdate,
                    headdeveloperid,
                    headdevelopername,
                    projectid: projectid,
                    developername: developername,
                    developerid: developerid,
                    status,
                    headdeveloperauthstatus,
                    paymentstatus,
                }
            })

            if (createUser) {
                res.status(200).send(createUser)
            }
        }



        


    } catch (err) {
        res.status(400).send(err)
    } finally {

    }
}
