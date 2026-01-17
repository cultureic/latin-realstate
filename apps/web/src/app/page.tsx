import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
