import type { Metadata } from "next";
import HomeAbout from "@/components/HomeAbout";
import HomeCTA from "@/components/HomeCTA";
import HomeFeaturedWork from "@/components/HomeFeaturedWork";
import HomeHero from "@/components/HomeHero";
import HomeServices from "@/components/HomeServices";
import HomeTestimonials from "@/components/HomeTestimonials";

export const metadata: Metadata = {
  title: "Wedding, Portrait & Event Photography",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeFeaturedWork />
      <HomeAbout />
      <HomeTestimonials />
      <HomeCTA />
    </>
  );
}
