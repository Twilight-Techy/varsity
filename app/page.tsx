import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Communities from "@/components/communities"
import AiAssistant from "@/components/ai-assistant"
import Testimonials from "@/components/testimonials"
import Cta from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/5 via-background to-purple-600/5 pointer-events-none" />
      <Navbar />
      <Hero />
      <Features />
      <Communities />
      <AiAssistant />
      <Testimonials />
      <Cta />
      <Footer />
    </main>
  )
}
