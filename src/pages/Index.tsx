import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { LoadingScreen } from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-background"
        >
          <Navigation onSectionChange={handleSectionChange} />
          
          <main>
            <HeroSection />
            <PortfolioSection />
            <AboutSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <footer className="py-8 px-6 border-t border-border/50 text-center">
            <div className="container mx-auto">
              <p className="text-muted-foreground text-sm">
                © 2025 Creative Portfolio. Crafted with passion and cutting-edge technology.
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
};

export default Index;
