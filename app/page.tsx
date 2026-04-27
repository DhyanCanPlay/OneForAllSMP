import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import JoinSteps from '@/components/JoinSteps'
import ServerStatus from '@/components/ServerStatus'
import GalleryGrid from '@/components/GalleryGrid'
import RulesList from '@/components/RulesList'
import SuggestionsSection from '@/components/SuggestionsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <JoinSteps />
      <ServerStatus />
      <GalleryGrid />
      <RulesList />
     // <SuggestionsSection />
      <Footer />
    </main>
  )
}
