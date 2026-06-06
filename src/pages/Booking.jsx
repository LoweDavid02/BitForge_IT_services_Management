import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import AntiGravityBackground from '../components/AntiGravityBackground';

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
  });

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'IT Consulting',
    'E-Commerce Solutions',
    'Custom Software Development',
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM',
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking submitted successfully! We will contact you soon.');
    // Reset form
    setFormData({
      service: '',
      date: '',
      time: '',
      name: '',
      email: '',
    });
    setCurrentStep(1);
  };

  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = 30;
    const startDay = 0; // Sunday
    
    // Add empty cells for days before the 1st
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const steps = [
    { number: 1, title: 'Select Service' },
    { number: 2, title: 'Choose Date & Time' },
    { number: 3, title: 'Confirm' },
  ];

  return (
    <AntiGravityBackground>
      <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
            Book a Consultation
          </span>
          <h1 className="font-syne font-bold text-5xl md:text-6xl mt-4">
            Reservation
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step.number
                      ? 'bg-accent-blue text-white'
                      : 'bg-bg-card text-text-muted'
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step.number ? 'bg-accent-blue' : 'bg-bg-card'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-text-muted">{step.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="p-8">
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div>
              <h2 className="font-syne font-bold text-2xl mb-6">Select a Service</h2>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <label
                    key={index}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.service === service
                        ? 'border-accent-blue bg-accent-blue/10'
                        : 'border-border-color hover:border-accent-blue/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service}
                      checked={formData.service === service}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-medium">{service}</span>
                  </label>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={handleNext} disabled={!formData.service}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Choose Date & Time */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-syne font-bold text-2xl mb-6">Choose Date & Time</h2>
              
              {/* Calendar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-syne font-bold text-xl">June 2026</h3>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-text-muted py-2">
                      {day}
                    </div>
                  ))}
                  
                  {generateCalendarDays().map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && setFormData({ ...formData, date: `2026-06-${day}` })}
                      disabled={!day}
                      className={`aspect-square rounded-lg transition-all ${
                        day
                          ? formData.date === `2026-06-${day}`
                            ? 'bg-accent-blue text-white'
                            : 'bg-bg-card hover:bg-accent-blue/20 text-text-primary'
                          : 'invisible'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-syne font-bold text-xl mb-4">Available Time Slots</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`p-3 rounded-lg font-medium transition-all ${
                        formData.time === time
                          ? 'bg-accent-blue text-white'
                          : 'bg-bg-card hover:bg-accent-blue/20 text-text-primary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.date || !formData.time}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {currentStep === 3 && (
            <div>
              <h2 className="font-syne font-bold text-2xl mb-6">Confirm Your Booking</h2>
              
              {/* Summary */}
              <div className="bg-bg-card p-6 rounded-lg mb-6">
                <h3 className="font-syne font-bold text-lg mb-4">Booking Summary</h3>
                <div className="space-y-2 text-text-muted">
                  <p><span className="text-text-primary font-medium">Service:</span> {formData.service}</p>
                  <p><span className="text-text-primary font-medium">Date:</span> {formData.date}</p>
                  <p><span className="text-text-primary font-medium">Time:</span> {formData.time}</p>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={handleBack} type="button">
                    Back
                  </Button>
                  <Button type="submit">
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Card>
      </div>
      </div>
    </AntiGravityBackground>
  );
};

export default Booking;
