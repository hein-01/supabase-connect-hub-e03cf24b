import { Header } from '@/components/Header';
import { DevEssentialsSection } from '@/components/DevEssentialsSection';
import { AIForEveryoneSection } from '@/components/AIForEveryoneSection';
import { MoneyMakingSection } from '@/components/MoneyMakingSection';
import { RankingsSection } from '@/components/RankingsSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { Footer } from '@/components/Footer';
import { SiteDataProvider } from '@/contexts/SiteDataContext';

const Index = () => {
  return (
    <SiteDataProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          <DevEssentialsSection />
          <AIForEveryoneSection />
          <MoneyMakingSection />
          <RankingsSection />
          <CategoriesSection />
        </main>
        
        <Footer />
      </div>
    </SiteDataProvider>
  );
};

export default Index;
