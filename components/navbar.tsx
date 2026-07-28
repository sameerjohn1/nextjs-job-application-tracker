"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth/auth-client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import SignOutButton from "./sign-out-btn";

export default function Navbar() {
    const { data: sessionData, isPending } = useSession();
    const router = useRouter();



    const session = sessionData;

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-semibold text-primary"
                >
                    <Briefcase />
                    Job Tracker
                </Link>
                <div className="flex items-center gap-4">
                    {isPending ? (
                        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                    ) : session?.user ? (
                        <>
                            <Link href={"/dashboard"} >
                                <Button variant={"ghost"}>Dashboard</Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="relative h-8 w-8 rounded-full p-0 outline-none select-none hover:opacity-80 transition-opacity flex items-center justify-center">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {session.user.name ? session.user.name[0].toUpperCase() : "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>

                                    <SignOutButton />

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href={"/sign-in"}>
                                <Button variant={"ghost"}>Login</Button>
                            </Link>
                            <Link href={"/sign-up"}>
                                <Button className={"bg-primary"}>Start for free</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}