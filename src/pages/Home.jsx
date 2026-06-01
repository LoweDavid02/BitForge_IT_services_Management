import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
  const stats = [
    { label: 'Team Members', value: '10+' },
    { label: 'Delivery Time', value: '2-Month' },
    { label: 'Clients', value: 'International' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
              Welcome to BitForge
            </span>
          </div>
          
          <h1 className="font-syne font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
            WHERE INNOVATION
            <br />
            <span className="text-accent-blue">IS FORGED</span>
          </h1>
          
          <p className="text-text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Crafting cutting-edge digital solutions that transform ideas into reality. 
            Your trusted partner in web development, mobile apps, and IT consulting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button>Get Started</Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="secondary">View Our Work</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-accent-blue py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-white font-syne font-bold text-2xl mx-8">
            WEB DEVELOPMENT • MOBILE APPS • UI/UX DESIGN • IT CONSULTING •
            WEB DEVELOPMENT • MOBILE APPS • UI/UX DESIGN • IT CONSULTING •
          </span>
        </div>
      </div>

      {/* Mission Strip */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
              Our Impact
            </span>
            <h2 className="font-syne font-bold text-4xl md:text-5xl mt-4">
              Building Digital Excellence
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} hover className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-blue mb-2">
                  {stat.value}
                </div>
                <div className="text-text-muted font-medium">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-bg-surface">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-syne font-bold text-4xl md:text-5xl mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Let's discuss how we can help bring your vision to life
          </p>
          <Link to="/booking">
            <Button>Schedule a Consultation</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
