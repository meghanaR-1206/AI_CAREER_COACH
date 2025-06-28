"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #00809D 0%, #FF7601 100%)",
      }}
    >
      {/* Animated Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 -mb-[1px]">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-[200px] block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#FCECDD">
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,120 C360,180 1080,60 1440,120 L1440,0 L0,0 Z;
                M0,100 C360,40 1080,160 1440,100 L1440,0 L0,0 Z;
                M0,140 C360,100 1080,40 1440,140 L1440,0 L0,0 Z;
                M0,120 C360,180 1080,60 1440,120 L1440,0 L0,0 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg animate-fade-in">
          AI Career Coach <br />
          <span className="text-[#FCECDD] drop-shadow-md">
            Your Career, Upgraded.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#FCECDD]/80 mb-8 max-w-xl mx-auto animate-fade-in">
          Get personalized career guidance powered by artificial intelligence — resume reviews, interview prep, and more.
        </p>

        <Link href="/onboarding" passHref>
          <Button
            size="lg"
            className="bg-[#FCECDD] text-[#FF7601] hover:bg-white font-semibold shadow-md animate-bounce transition"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
