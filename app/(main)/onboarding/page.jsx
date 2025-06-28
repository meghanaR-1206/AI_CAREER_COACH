import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import OnboardingForm from './components/onboarding-form'
import { industries } from "@/data/Industries";

import React from 'react'

const OnboardingPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus()

  if (isOnboarded) {
    redirect('/dashboard')
  }

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, #00809D 0%, #FF7601 100%)',
      }}
    >
      <div className="w-full max-w-3xl bg-[#FCECDD] rounded-xl shadow-lg p-8 md:p-10 border border-[#FF7601]">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#FF7601] mb-6">
          Complete Your Onboarding
        </h1>
        <p className="text-center text-[#333] text-md mb-8">
          Tell us more about your background so we can personalize your experience.
        </p>
        <OnboardingForm industries={industries} />
      </div>
    </main>
  )
}

export default OnboardingPage
