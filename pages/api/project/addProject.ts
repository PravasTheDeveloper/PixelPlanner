import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { projectname, headdevelopername, projectvalue, startingdate, endingdate, headdeveloperid } = req.body;

        const status = "PENDING"
        const paymentstatus = "PENDING"
        const headdeveloperauthstatus = "PENDING"

        await prisma.$connect()

        const newProject = await prisma.projects.create({
            data: {
                projectname,
                projectvalue,
                startingdate,
                endingdate,
                headdeveloperid,
                headdevelopername,
                status,
                headdeveloperauthstatus,
                paymentstatus
            }
        });

        if (newProject) {
            const createUser = await prisma.projectAssign.create({
                data: {
                    projectname,
                    projectvalue,
                    startingdate,
                    endingdate,
                    headdeveloperid,
                    headdevelopername,
                    projectid: newProject.id,
                    developername: headdevelopername,
                    developerid: headdeveloperid,
                    status,
                    headdeveloperauthstatus,
                    paymentstatus,
                }
            })

            if (createUser) {
                res.status(200).json(newProject);
            }
        }


    } catch (err) {
        res.status(400).send(err)
    } finally {
        await prisma.$disconnect()
    }
}
