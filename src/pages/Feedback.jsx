import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import AntiGravityBackground from '../components/AntiGravityBackground';

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: '',
    message: '',
  });

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'IT Consulting',
    'E-Commerce Solutions',
    'Custom Software Development',
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFormData({
        fullName: '',
        email: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <AntiGravityBackground>
      <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
            We Value Your Opinion
          </span>
          <h1 className="font-syne font-bold text-5xl md:text-6xl mt-4">
            Feedback
          </h1>
          <p className="text-text-muted text-lg mt-4">
            Help us improve our services by sharing your experience
          </p>
        </div>

        {/* Feedback Form */}
        {!submitted ? (
          <Card className="p-8 md:p-12 bg-white-contrast">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-bg-primary font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-2 border-gray-300 text-bg-primary px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-bg-primary font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-2 border-gray-300 text-bg-primary px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
                />
              </div>

              {/* Service Used */}
              <div>
                <label className="block text-bg-primary font-medium mb-2">
                  Service Used <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-2 border-gray-300 text-bg-primary px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-bg-primary font-medium mb-2">
                  Rate Your Experience <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-4xl transition-all hover:scale-110"
                    >
                      {star <= rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-bg-primary font-medium mb-2">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us about your experience..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="bg-white border-2 border-gray-300 text-bg-primary px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={rating === 0}
                >
                  Submit Feedback
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  🔒 Your feedback is encrypted and secure
                </p>
              </div>
            </form>
          </Card>
        ) : (
          /* Success State */
          <Card className="p-12 text-center bg-white-contrast">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="font-syne font-bold text-3xl text-bg-primary mb-4">
              Thank You!
            </h2>
            <p className="text-gray-600 text-lg">
              Your feedback has been submitted successfully. We appreciate your time and input!
            </p>
          </Card>
        )}

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-syne font-bold text-lg mb-2">Quick Response</h3>
            <p className="text-text-muted text-sm">
              We review all feedback within 24 hours
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-syne font-bold text-lg mb-2">Secure & Private</h3>
            <p className="text-text-muted text-sm">
              Your information is encrypted and protected
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-syne font-bold text-lg mb-2">Continuous Improvement</h3>
            <p className="text-text-muted text-sm">
              Your feedback helps us serve you better
            </p>
          </Card>
        </div>
      </div>
      </div>
    </AntiGravityBackground>
  );
};

export default Feedback;
