import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import LogosMarquee from '../components/home/LogosMarquee';
import StorySection from '../components/home/StorySection';
import ServicesShowcase from '../components/home/ServicesShowcase';
import IndustriesSection from '../components/home/IndustriesSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ProcessSection from '../components/home/ProcessSection';
import ProgramsSection from '../components/home/ProgramsSection';
import FAQSection from '../components/home/FAQSection';
import { api } from '../services/api';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [settings, setSettings] = useState(null);
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [srvRes, projRes, faqRes, setRes, contentRes] = await Promise.all([
          api.getServices(),
          api.getProjects({ featured: 'true' }),
          api.getFAQs(),
          api.getSettings(),
          api.getPageContent('home')
        ]);

        if (srvRes.success) setServices(srvRes.data);
        if (projRes.success) setProjects(projRes.data);
        if (faqRes.success) setFaqs(faqRes.data);
        if (setRes.success) setSettings(setRes.data);
        if (contentRes.success) setHomeContent(contentRes.data);
      } catch (err) {
        console.error('Error fetching home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="w-full">
      <HeroSection settings={settings} homeContent={homeContent} />
      <LogosMarquee />
      <StorySection stats={settings?.stats} homeContent={homeContent} />
      <ServicesShowcase services={services} />
      <IndustriesSection />
      <FeaturedProjects projects={projects} />
      <ProcessSection />
      <ProgramsSection />
      <FAQSection faqs={faqs} />
    </div>
  );
};

export default HomePage;
