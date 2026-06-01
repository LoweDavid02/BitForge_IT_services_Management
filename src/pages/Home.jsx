import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative z-10 text-center max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
          {/* Top Label */}
          <div className="mb-8">
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-accent-blue">
              [ IT SERVICES · PORTFOLIO · SCHEDULE ]
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-syne font-bold text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] tracking-tight">
            WHERE
            <br />
            INNOVATION IS
            <br />
            <span className="text-accent-blue">FORGED.</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-text-muted text-base md:text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
            Precision-engineered IT solutions for high-stakes enterprise environments. We craft digital excellence with the sharpness of industrial forge.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/booking">
              <Button className="px-8 py-4 text-sm font-semibold tracking-wider">BOOK A SERVICE</Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="secondary" className="px-8 py-4 text-sm font-semibold tracking-wider">VIEW PORTFOLIO</Button>
            </Link>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto pb-8 flex justify-between items-center text-xs font-jetbrains text-text-muted uppercase tracking-wider">
          <span>SYSTEM STATUS: OPERATIONAL</span>
          <span>ENGINEERING SINCE 2023</span>
        </div>
      </section>



      {/* Stats Section */}
      <section className="py-20 px-4 bg-bg-primary">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Card 1 */}
            <div className="bg-bg-card border border-border-color rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-3 font-syne">10+</div>
              <div className="text-sm font-jetbrains uppercase tracking-wider text-text-muted mb-3">TEAM MEMBERS</div>
              <p className="text-xs text-text-muted leading-relaxed">
                Expert engineers and designers working in sync
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-bg-card border border-border-color rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-3 font-syne">2-Month</div>
              <div className="text-sm font-jetbrains uppercase tracking-wider text-text-muted mb-3">DELIVERY CYCLE</div>
              <p className="text-xs text-text-muted leading-relaxed">
                Rapid deployment without compromising quality
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-bg-card border border-border-color rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-3 font-syne">Global</div>
              <div className="text-sm font-jetbrains uppercase tracking-wider text-text-muted mb-3">CLIENT REACH</div>
              <p className="text-xs text-text-muted leading-relaxed">
                Serving enterprises across continents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-bg-primary">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-accent-blue block mb-4">
                CORE CAPABILITIES
              </span>
              <h2 className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl">
                ENGINEERED FOR SCALE
              </h2>
            </div>
            <Link to="/portfolio" className="hidden md:block font-jetbrains text-xs uppercase tracking-wider text-accent-blue hover:text-accent-blue-glow transition-colors">
              VIEW ALL SERVICES →
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column - 2 Cards Stacked */}
            <div className="flex flex-col gap-6">
              {/* Custom Enterprise Software */}
              <div className="bg-bg-card border border-border-color rounded-lg p-8 flex-1">
                <div className="w-12 h-12 mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-syne font-bold text-xl mb-3 uppercase">CUSTOM ENTERPRISE SOFTWARE</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Tailored solutions built from the ground up to match your exact business requirements and workflows.
                </p>
              </div>

              {/* Cyber Armor */}
              <div className="bg-bg-card border border-border-color rounded-lg p-8 flex-1">
                <div className="w-12 h-12 mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-syne font-bold text-xl mb-3 uppercase">CYBER ARMOR</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Enterprise-grade security infrastructure protecting your digital assets from evolving threats.
                </p>
              </div>
            </div>

            {/* Middle Column - 2 Cards Stacked */}
            <div className="flex flex-col gap-6">
              {/* Visual Placeholder */}
              <div className="bg-bg-card border border-border-color rounded-lg p-8 flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-accent-blue/5 border border-accent-blue/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-text-muted text-xs uppercase tracking-wider font-jetbrains">VISUAL SHOWCASE</p>
                </div>
              </div>

              {/* Cloud Hybrid */}
              <div className="bg-bg-card border border-border-color rounded-lg p-8 flex-1">
                <div className="w-12 h-12 mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="font-syne font-bold text-xl mb-3 uppercase">CLOUD HYBRID</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Seamless integration between on-premise and cloud infrastructure for maximum flexibility.
                </p>
              </div>
            </div>

            {/* Right Column - 1 Large Blue Card */}
            <div className="bg-accent-blue rounded-lg p-8 flex flex-col justify-between min-h-[400px] lg:min-h-full">
              <div>
                <div className="w-12 h-12 mb-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-syne font-bold text-2xl mb-4 text-white uppercase">RAPID DEPLOYMENT</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-8">
                  Get your solutions to market faster with our streamlined development and deployment pipeline. From concept to production in record time.
                </p>
              </div>
              <Link to="/booking">
                <button className="w-full bg-white text-accent-blue px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                  START PROJECT
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile View All Link */}
          <div className="md:hidden mt-8 text-center">
            <Link to="/portfolio" className="font-jetbrains text-xs uppercase tracking-wider text-accent-blue hover:text-accent-blue-glow transition-colors">
              VIEW ALL SERVICES →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
