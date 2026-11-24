import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Sendix } from "@/components/sendix"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Closing } from "@/components/closing"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Sendix />
        <Projects />
        <Services />
        <About />
        <Closing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
