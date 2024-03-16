import React from 'react'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavBarSection from "@/components/Home/NavBar/NavBarSection";
import CardSection from "@/components/Home/CardSection/CardSection";

import TransectionTable from "@/components/Home/TableData/TransectionTable";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PorjectCardSection from '@/components/Home/CardSection/PorjectCardSection';
import TableData from '@/components/Home/TableData/TableData';
import AddProjectButton from '@/components/Home/AddButton/AddProjectButton';


export default function projects() {
    return (
        <>
            <NavBarSection />
            <PorjectCardSection />
            <TableData />
            <AddProjectButton />
        </>
    )
}
