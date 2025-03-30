"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { TARGET_DATE } from "@/constants"

import { Button } from "@/components/ui/button"

const calculateTimeRemaining = (targetDate: Date) => {
  const timeDifference = Math.max(targetDate.getTime() - Date.now(), 0)

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
    seconds: Math.floor((timeDifference / 1000) % 60),
  }
}

export function DealCountdown() {
  const [time, setTime] = useState(
    calculateTimeRemaining(new Date(TARGET_DATE)),
  )

  useEffect(() => {
    const updateTimer = () =>
      setTime(calculateTimeRemaining(new Date(TARGET_DATE)))

    const timerInterval = setInterval(updateTimer, 1000)
    return () => clearInterval(timerInterval) // Cleanup on unmount
  }, [])

  if (
    !time ||
    (time.days === 0 &&
      time.hours === 0 &&
      time.minutes === 0 &&
      time.seconds === 0)
  ) {
    return <DealEnded />
  }

  return (
    <section className="my-20 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-3xl font-bold">Deal Of The Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals
          of the Month! Every purchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Don&apos;t miss out! 🎁🛒
        </p>
        <ul className="grid grid-cols-4">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
            <StatBox key={label} label={label} value={Object.values(time)[i]} />
          ))}
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>
      <PromoImage />
    </section>
  )
}

const DealEnded = () => (
  <section className="my-20 grid grid-cols-1 md:grid-cols-2">
    <div className="flex flex-col justify-center gap-2">
      <h3 className="text-3xl font-bold">Deal Has Ended</h3>
      <p>This deal is no longer available. Check out our latest promotions!</p>
      <div className="text-center">
        <Button asChild>
          <Link href="/search">View Products</Link>
        </Button>
      </div>
    </div>
    <PromoImage />
  </section>
)

const PromoImage = () => (
  <div className="flex justify-center">
    <Image src="/images/promo.jpg" alt="promotion" width={300} height={200} />
  </div>
)

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="w-full p-4 text-center">
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
)
