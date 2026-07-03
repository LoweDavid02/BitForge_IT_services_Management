import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import AntiGravityBackground from '../components/AntiGravityBackground';

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO, TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'BitForge transformed our legacy systems into a modern cloud infrastructure. Their expertise and professionalism exceeded our expectations.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Founder, StartupHub',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      text: 'The team delivered our mobile app ahead of schedule with exceptional quality. Highly recommend for any serious tech project.',
      rating: 5,
    },
    {
      name: 'Emily Watson',
      role: 'Director of IT, Global Enterprises',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      text: 'Outstanding security implementation. BitForge secured our entire infrastructure and provided comprehensive documentation.',
      rating: 5,
    },
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', color: 'from-blue-500/20 to-cyan-500/20' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500/20 to-emerald-500/20' },
    { name: 'Python', icon: '🐍', color: 'from-yellow-500/20 to-blue-500/20' },
    { name: 'AWS', icon: '☁️', color: 'from-orange-500/20 to-yellow-500/20' },
    { name: 'Docker', icon: '🐳', color: 'from-blue-400/20 to-blue-600/20' },
    { name: 'Kubernetes', icon: '⎈', color: 'from-blue-500/20 to-purple-500/20' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-400/20 to-green-600/20' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600/20 to-indigo-600/20' },
  ];

  return (
    <AntiGravityBackground>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="relative z-10 text-center max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
            {/* Top Label */}
            <div className="mb-8 animate-fade-in">
              <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-accent-blue">
                [ IT SERVICES · INNOVATION · EXCELLENCE ]
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="font-syne font-bold text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] tracking-tight">
              WHERE
              <br />
              INNOVATION IS
              <br />
              <span className="text-accent-blue relative inline-block">
                FORGED.
                <span className="absolute inset-0 blur-2xl text-accent-blue opacity-50 animate-pulse-glow">FORGED.</span>
              </span>
            </h1>
          
            {/* Subheading */}
            <p className="text-text-muted text-base md:text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
              Precision-engineered IT solutions for high-stakes enterprise environments. We craft digital excellence with the sharpness of an industrial forge.
            </p>
          
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/booking">
                <Button className="px-8 py-4 text-sm font-semibold tracking-wider">BOOK A SERVICE</Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" className="px-8 py-4 text-sm font-semibold tracking-wider">EXPLORE SERVICES</Button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce mt-8">
              <svg className="w-6 h-6 mx-auto text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* About BitForge Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-accent-blue block mb-4">
                  WHO WE ARE
                </span>
                <h2 className="font-syne font-bold text-4xl md:text-5xl mb-6">
                  Forging the Future of Technology
                </h2>
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  BitForge is a cutting-edge IT services company specializing in enterprise-grade solutions. Founded on the principles of precision engineering and innovative thinking, we transform complex technical challenges into elegant, scalable solutions.
                </p>
                <p className="text-text-muted text-lg leading-relaxed mb-8">
                  Our team of 10+ seasoned professionals brings together expertise in software development, cloud architecture, cybersecurity, and digital transformation. We don't just build software—we forge partnerships that drive lasting business value.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/team">
                    <Button variant="secondary">Meet Our Team</Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button variant="secondary">View Our Work</Button>
                  </Link>
                </div>
              </div>

              {/* Right Content - Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center hover:shadow-blue-glow transition-all cursor-pointer">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-syne font-bold text-lg mb-2">Mission-Critical</h3>
                  <p className="text-text-muted text-sm">Enterprise reliability</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-blue-glow transition-all cursor-pointer">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-syne font-bold text-lg mb-2">Rapid Delivery</h3>
                  <p className="text-text-muted text-sm">Agile methodology</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-blue-glow transition-all cursor-pointer">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="font-syne font-bold text-lg mb-2">Security First</h3>
                  <p className="text-text-muted text-sm">Bank-grade protection</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-blue-glow transition-all cursor-pointer">
                  <div className="text-4xl mb-3">🌐</div>
                  <h3 className="font-syne font-bold text-lg mb-2">Global Scale</h3>
                  <p className="text-text-muted text-sm">Worldwide deployment</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-bg-card/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-accent-blue block mb-4">
                BY THE NUMBERS
              </span>
              <h2 className="font-syne font-bold text-4xl md:text-5xl">
                Proven Track Record
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Stat Card 1 */}
              <Card className="p-8 text-center hover:shadow-blue-glow transition-all">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-white mb-3 font-syne">10+</div>
                <div className="text-sm font-jetbrains uppercase tracking-wider text-text-muted mb-3">TEAM MEMBERS</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Expert engineers and designers
                </p>
              </Card>

              {/* Stat Card 2 */}
              <Card className="p-8 text-center hover:shadow-blue-glow transition-all">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-white mb-3 font-syne">50+</div>
                <div className="text-sm font-jetbrains uppercase tracking-wider text-text-muted mb-3">PROJECTS COMPLETED</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Successful deliveries worldwide
                </p>
              </Card>

              {/* Stat Card 3 */}
              <Card className="p-8 text-center hover:shadow-blue-glow transition-all">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-white mb-3 font-syne">99.9%</div>
                <div className="text-sm font-jetbrains uppercase tracking-wider text-text-muted mb-3">UPTIME GUARANTEE</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Enterprise-grade reliability
                </p>
              </Card>

              {/* Stat Card 4 */}
              <Card className="p-8 text-center hover:shadow-blue-glow transition-all">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-white mb-3 font-syne">15+</div>
                <div className="text-sm font-jetbrains uppercase tracking-wider text-text-muted mb-3">COUNTRIES SERVED</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Global client reach
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-accent-blue block mb-4">
                OUR TECH STACK
              </span>
              <h2 className="font-syne font-bold text-4xl md:text-5xl mb-4">
                Cutting-Edge Technologies
              </h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                We leverage the latest and most robust technologies to build scalable, secure solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${tech.color} border border-border-color rounded-lg p-6 text-center hover:scale-105 transition-transform cursor-pointer group`}
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{tech.icon}</div>
                  <h3 className="font-syne font-bold text-lg text-white group-hover:text-accent-blue transition-colors">
                    {tech.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-accent-blue block mb-4">
                CLIENT TESTIMONIALS
              </span>
              <h2 className="font-syne font-bold text-4xl md:text-5xl">
                What Our Clients Say
              </h2>
            </div>

            <Card className="p-12 relative">
              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xl text-text-muted italic mb-6 leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full border-2 border-accent-blue"
                  />
                  <div className="text-left">
                    <p className="font-syne font-bold text-lg">{testimonials[activeTestimonial].name}</p>
                    <p className="text-text-muted text-sm">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeTestimonial === index
                        ? 'bg-accent-blue w-8'
                        : 'bg-border-color hover:bg-accent-blue/50'
                    }`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-accent-blue/20 to-purple-600/20 border-accent-blue/30">
              <h2 className="font-syne font-bold text-4xl md:text-5xl mb-6">
                Ready to Forge Your Vision?
              </h2>
              <p className="text-text-muted text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Let's transform your ideas into powerful digital solutions. Schedule a consultation and discover what we can build together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking">
                  <Button className="px-10 py-4 text-base">Book Consultation</Button>
                </Link>
                <Link to="/feedback">
                  <Button variant="secondary" className="px-10 py-4 text-base">Get in Touch</Button>
                </Link>
              </div>
              <p className="text-text-muted text-sm mt-8">
                💼 Enterprise plans available | 🔒 NDA upon request | ⚡ Response within 24 hours
              </p>
            </Card>
          </div>
        </section>
      </div>
    </AntiGravityBackground>
  );
};

export default Home;
