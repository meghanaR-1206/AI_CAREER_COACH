// app/page.jsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/Hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { features } from "@/data/Features";
import { testimonial } from "@/data/Testinomial";
import { faqs } from "@/data/Faqs";
import { howItWorks } from "@/data/HowItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features */}
      <section className="w-full py-16 bg-[#FCECDD] text-[#00809D]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-2 border-[#FF7601] hover:border-[#F3A26D] transition-colors shadow-sm"
              >
                <CardContent className="pt-6 pb-8 px-4 flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#00809D] opacity-80">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-16 bg-[#F3A26D]/30 text-[#00809D]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center max-w-4xl mx-auto">
            {[
              { stat: "50+", label: "Industries Covered" },
              { stat: "1000+", label: "Interview Questions" },
              { stat: "95%", label: "Success Rate" },
              { stat: "24/7", label: "AI Support" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-4xl font-extrabold">{item.stat}</h3>
                <p className="text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 bg-[#FCECDD] text-[#00809D]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-sm opacity-80">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF7601]/20 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm opacity-80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-16 bg-[#F3A26D]/30 text-[#00809D]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((t, index) => (
              <Card key={index} className="bg-[#FCECDD] shadow-md">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      width={48}
                      height={48}
                      src={t.image}
                      alt={t.author}
                      className="rounded-full border border-[#FF7601]/40"
                    />
                    <div>
                      <p className="font-semibold">{t.author}</p>
                      <p className="text-xs text-[#00809D]/80">{t.role}</p>
                      <p className="text-xs text-[#FF7601]">{t.company}</p>
                    </div>
                  </div>
                  <blockquote className="italic text-sm text-[#00809D]/80">
                    “{t.quote}”
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="w-full py-16 bg-[#FCECDD] text-[#00809D]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-sm opacity-80">
              Find answers to common questions about our platform
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#00809D] text-[#FCECDD]">
        <div className="mx-auto py-24 px-4 text-center rounded-lg">
          <h2 className="text-4xl font-extrabold sm:text-5xl mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-md max-w-xl mx-auto opacity-90 mb-6">
            Join thousands of professionals who are advancing their careers with AI-powered guidance.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-[#FF7601] hover:bg-[#F3A26D] text-white font-semibold"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
