"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-[#00809D] text-[#fcf9dd] py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left: Navigation Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-[#FCECDD] hover:bg-[#F3A26D]/20">
              <Menu className="h-5 w-5 mr-2" />
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#FCECDD] text-[#00809D] border border-[#FF7601]">
            <DropdownMenuItem onClick={() => router.push("/")}>Home</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/onboarding")}>Industry Insights</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/resume_editter")}>Resume Builder</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/interview")}>Interview Prep</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/learn")}>Start Learning</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Center: Title */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-center">
          CareerCoach AI
        </h1>

        {/* Right: Authentication */}
        <div className="flex items-center space-x-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-[#FF7601] text-white hover:bg-[#F3A26D]">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-[#F3A26D]/20"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
