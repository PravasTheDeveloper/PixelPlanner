import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavBarSection from "@/components/Home/NavBar/NavBarSection";
import CardSection from "@/components/Home/CardSection/CardSection";
import AddButton from "@/components/Home/AddButton/AddButton";
import TransectionTable from "@/components/Home/TableData/TransectionTable";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push('/login');
  }, [session , router]);

  if (status === "loading") {
    return <div className='w-full h-screen'>Loading...</div>;
  }

  return (
    <>
      <NavBarSection />
      <CardSection />
      <TransectionTable />
      <AddButton />
    </>
  );
}
