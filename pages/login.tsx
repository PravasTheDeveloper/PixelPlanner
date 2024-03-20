import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { signIn, useSession } from 'next-auth/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Swal from 'sweetalert2'
import BeatLoader from "react-spinners/BeatLoader";
import { useRouter } from 'next/router'
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Login() {
    const { data: session, status = "loading" } = useSession();
    const router = useRouter();

    const [loading, setloading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlesubmit = async (e: any) => {

        e.preventDefault()

        if (!email || !password) {
            Swal.fire({
                title: "Warning",
                text: "Please fill all the feild",
                icon: "warning"
            });
        } else {
            setloading(true)
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: `${window.location.origin}/`
            })

            if (result?.url) {
                window.location.href = result.url;
            } else {
                setloading(false)
                Swal.fire({
                    title: "Credential Error",
                    text: "Enter Correct Eamil and Password",
                    icon: "error"
                });
            }
        }
    }

    useEffect(() => {
        if (status === "loading") return;
        if (session) router.push('/');
    }, [session, status]);

    if (status === "loading") {
        return <div className='w-full h-screen flex justify-center items-center'><PacmanLoader size={50} color='#94a3b8' /><h1>Loading...</h1></div>;
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handlesubmit(e);
        }
    };

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Pixle Planer</CardTitle>
                        <CardDescription>See your work and income</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Eamil</Label>
                                    <Input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} onKeyPress={handleKeyPress} id="email" placeholder="Enter Your Email" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} onKeyPress={handleKeyPress} id="password" placeholder="Enter Your Password" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={handlesubmit}>
                            {
                                loading === true ? <BeatLoader size={10} color='white' /> :
                                    "Log In"
                            }
                        </Button>
                        <Button variant="outline">Forget Password</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
