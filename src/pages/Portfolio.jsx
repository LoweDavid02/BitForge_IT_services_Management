import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const Portfolio = () => {
  const projects = [
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack online shopping solution with payment integration',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'
    },
    {
      name: 'Healthcare Management System',
      description: 'Patient management and appointment scheduling application',
      tags: ['Vue.js', 'Laravel', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'
    },
    {
      name: 'Real Estate Portal',
      description: 'Property listing and virtual tour platform',
      tags: ['Next.js', 'PostgreSQL', 'AWS'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'
    },
    {
      name: 'Financial Dashboard',
      description: 'Analytics and reporting tool for financial data',
      tags: ['React', 'D3.js', 'Python'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    },
    {
      name: 'Social Media App',
      description: 'Mobile-first social networking platform',
      tags: ['React Native', 'Firebase', 'Redux'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
    },
    {
      name: 'Learning Management System',
      description: 'Online education platform with video streaming',
      tags: ['Angular', 'Express', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop'
    },
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      icon: '🌐'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      icon: '📱'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that creates engaging digital experiences',
      icon: '🎨'
    },
    {
      title: 'IT Consulting',
      description: 'Strategic technology guidance to optimize your business operations',
      icon: '💼'
    },
  ];

  const contactOptions = [
    { name: 'Email', icon: '📧', link: 'mailto:contact@bitforge.com' },
    { name: 'Messenger', icon: '💬', link: '#' },
    { name: 'WhatsApp', icon: '📞', link: '#' },
  ];

  return (
    <div className="min-h-screen">
      {/* Portfolio Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
              Our Work
            </span>
            <h1 className="font-syne font-bold text-5xl md:text-6xl mt-4">
              Portfolio
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} hover className="overflow-hidden p-0">
                <div className="aspect-video bg-bg-card overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-syne font-bold text-xl mb-2">{project.name}</h3>
                  <p className="text-text-muted mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white-contrast">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
              What We Do
            </span>
            <h2 className="font-syne font-bold text-5xl md:text-6xl mt-4 text-bg-primary">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-accent-blue transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-syne font-bold text-xl mb-2 text-bg-primary">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-4xl mb-4">
              Let's Connect
            </h2>
            <p className="text-text-muted">
              Choose your preferred way to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.link}
                className="card p-8 text-center hover:shadow-blue-glow transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {option.icon}
                </div>
                <h3 className="font-syne font-bold text-xl text-accent-blue">
                  {option.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
