import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import AntiGravityBackground from '../components/AntiGravityBackground';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Infrastructure', 'Consulting'];

  const services = [
    {
      category: 'Development',
      title: 'Custom Web Development',
      description: 'Bespoke web applications built with cutting-edge technologies tailored to your business needs.',
      features: ['React/Vue/Angular', 'Node.js/Python/PHP Backend', 'RESTful APIs', 'Responsive Design'],
      icon: '🌐',
      pricing: 'Starting at $5,000',
      timeline: '6-12 weeks',
    },
    {
      category: 'Development',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with seamless UX.',
      features: ['React Native/Flutter', 'Native iOS & Android', 'Push Notifications', 'Offline Support'],
      icon: '📱',
      pricing: 'Starting at $8,000',
      timeline: '8-16 weeks',
    },
    {
      category: 'Development',
      title: 'E-Commerce Solutions',
      description: 'Complete online store development with payment integration and inventory management.',
      features: ['Shopping Cart', 'Payment Gateway', 'Admin Dashboard', 'SEO Optimization'],
      icon: '🛒',
      pricing: 'Starting at $7,000',
      timeline: '8-14 weeks',
    },
    {
      category: 'Design',
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive and engaging digital experiences.',
      features: ['Wireframing', 'Interactive Prototypes', 'User Research', 'Usability Testing'],
      icon: '🎨',
      pricing: 'Starting at $3,000',
      timeline: '4-8 weeks',
    },
    {
      category: 'Design',
      title: 'Brand Identity Design',
      description: 'Complete brand identity including logo, color schemes, and design systems.',
      features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Style Guide'],
      icon: '✨',
      pricing: 'Starting at $2,500',
      timeline: '3-6 weeks',
    },
    {
      category: 'Infrastructure',
      title: 'Cloud Migration & Setup',
      description: 'Seamless migration to cloud platforms with optimized architecture and security.',
      features: ['AWS/Azure/GCP', 'Docker/Kubernetes', 'Auto-scaling', '24/7 Monitoring'],
      icon: '☁️',
      pricing: 'Starting at $6,000',
      timeline: '6-10 weeks',
    },
    {
      category: 'Infrastructure',
      title: 'DevOps & CI/CD',
      description: 'Automated deployment pipelines and infrastructure as code for rapid delivery.',
      features: ['Jenkins/GitLab CI', 'Infrastructure as Code', 'Automated Testing', 'Deployment Automation'],
      icon: '⚙️',
      pricing: 'Starting at $4,500',
      timeline: '4-8 weeks',
    },
    {
      category: 'Infrastructure',
      title: 'Cybersecurity Solutions',
      description: 'Enterprise-grade security infrastructure protecting your digital assets from threats.',
      features: ['Penetration Testing', 'Security Audits', 'Firewall Configuration', 'Compliance'],
      icon: '🔒',
      pricing: 'Starting at $5,500',
      timeline: '5-10 weeks',
    },
    {
      category: 'Consulting',
      title: 'IT Strategy Consulting',
      description: 'Strategic technology guidance to align IT initiatives with business objectives.',
      features: ['Technology Roadmap', 'Architecture Review', 'Vendor Selection', 'Risk Assessment'],
      icon: '💼',
      pricing: 'Starting at $3,500',
      timeline: '3-6 weeks',
    },
    {
      category: 'Consulting',
      title: 'Digital Transformation',
      description: 'End-to-end digital transformation strategy and implementation support.',
      features: ['Process Automation', 'Legacy Modernization', 'Change Management', 'Training'],
      icon: '🚀',
      pricing: 'Starting at $10,000',
      timeline: '12-24 weeks',
    },
    {
      category: 'Development',
      title: 'API Development & Integration',
      description: 'Custom API development and third-party service integration for seamless connectivity.',
      features: ['RESTful APIs', 'GraphQL', 'Microservices', 'Third-party Integration'],
      icon: '🔌',
      pricing: 'Starting at $4,000',
      timeline: '4-8 weeks',
    },
    {
      category: 'Consulting',
      title: 'AI & Machine Learning',
      description: 'Implement intelligent solutions with machine learning and AI technologies.',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Model Training'],
      icon: '🤖',
      pricing: 'Starting at $12,000',
      timeline: '12-20 weeks',
    },
  ];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <AntiGravityBackground>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-accent-blue">
                [ ENTERPRISE-GRADE SOLUTIONS ]
              </span>
              <h1 className="font-syne font-bold text-5xl md:text-6xl lg:text-7xl mt-6 mb-6">
                OUR SERVICES
              </h1>
              <p className="text-text-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Comprehensive IT solutions engineered for scale, performance, and security. 
                From concept to deployment, we forge digital excellence.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-lg font-jetbrains text-xs uppercase tracking-wider transition-all ${
                    activeCategory === category
                      ? 'bg-accent-blue text-white shadow-blue-glow'
                      : 'bg-bg-card text-text-muted hover:bg-accent-blue/20 hover:text-accent-blue'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <Card key={index} hover className="p-8 flex flex-col">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{service.icon}</div>
                    <Badge active>{service.category}</Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-syne font-bold text-2xl mb-3">{service.title}</h3>

                  {/* Description */}
                  <p className="text-text-muted mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-3 text-accent-blue">KEY FEATURES:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-text-muted flex items-start gap-2">
                          <svg className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Timeline */}
                  <div className="border-t border-border-color pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-jetbrains uppercase text-text-muted">Investment</span>
                      <span className="text-sm font-semibold text-accent-blue">{service.pricing}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-jetbrains uppercase text-text-muted">Timeline</span>
                      <span className="text-sm font-semibold">{service.timeline}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to="/booking" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 bg-bg-card/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-accent-blue">
                HOW WE WORK
              </span>
              <h2 className="font-syne font-bold text-4xl md:text-5xl mt-4">
                OUR PROCESS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discovery', desc: 'We analyze your needs and define project scope' },
                { step: '02', title: 'Design', desc: 'Create wireframes and prototypes for approval' },
                { step: '03', title: 'Development', desc: 'Build your solution with agile methodology' },
                { step: '04', title: 'Deployment', desc: 'Launch and provide ongoing support' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent-blue/10 border-2 border-accent-blue flex items-center justify-center">
                    <span className="font-syne font-bold text-2xl text-accent-blue">{item.step}</span>
                  </div>
                  <h3 className="font-syne font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-12 text-center bg-gradient-to-br from-accent-blue/10 to-purple-600/10">
              <h2 className="font-syne font-bold text-4xl mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Let's discuss how we can help transform your ideas into reality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking">
                  <Button className="px-8 py-4">Book Consultation</Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="secondary" className="px-8 py-4">View Our Work</Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </AntiGravityBackground>
  );
};

export default Services;
