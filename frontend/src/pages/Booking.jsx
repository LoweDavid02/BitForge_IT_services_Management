import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import AntiGravityBackground from '../components/AntiGravityBackground';
import { servicesAPI, bookingsAPI } from '../api/client';

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ service: '', date: '', time: '', name: '', email: '' });
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM',
  ];

  // Load active services from the backend
  useEffect(() => {
    servicesAPI.list()
      .then(({ data }) => setServices(data.data || []))
      .catch(() => setServices([]))
      .finally(() => setLoadingServices(false));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await bookingsAPI.store({
        service: formData.service,
        date: formData.date,
        time: formData.time,
        name: formData.name,
        email: formData.email,
      });
      setSubmitted(true);
      setFormData({ service: '', date: '', time: '', name: '', email: '' });
      setCurrentStep(1);
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Generate calendar days for current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay();
  const monthLabel = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = (day) => `${year}-${pad(month + 1)}-${pad(day)}`;
  const isPast = (day) => new Date(year, month, day) < new Date(today.toDateString());

  const steps = [
    { number: 1, title: 'Select Service' },
    { number: 2, title: 'Choose Date & Time' },
    { number: 3, title: 'Confirm' },
  ];

  if (submitted) {
    return (
      <AntiGravityBackground>
        <div className="min-h-screen flex items-center justify-center py-20 px-4">
          <Card className="p-12 text-center max-w-lg mx-auto">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="font-syne font-bold text-3xl mb-4">Booking Submitted!</h2>
            <p className="text-text-muted text-lg mb-6">
              Your booking has been received and is pending confirmation. We'll contact you soon.
            </p>
            <Button onClick={() => setSubmitted(false)}>Book Another</Button>
          </Card>
        </div>
      </AntiGravityBackground>
    );
  }

  return (
    <AntiGravityBackground>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
              Book a Consultation
            </span>
            <h1 className="font-syne font-bold text-5xl md:text-6xl mt-4">Reservation</h1>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step.number ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted'
                    }`}>
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${currentStep > step.number ? 'bg-accent-blue' : 'bg-bg-card'}`} />
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
                {loadingServices ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services.map((svc) => (
                      <label
                        key={svc.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.service === svc.title
                            ? 'border-accent-blue bg-accent-blue/10'
                            : 'border-border-color hover:border-accent-blue/50'
                          }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={svc.title}
                          checked={formData.service === svc.title}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3">
                          {svc.icon && <span className="text-2xl">{svc.icon}</span>}
                          <div>
                            <span className="font-medium">{svc.title}</span>
                            {svc.pricing && (
                              <span className="ml-3 text-sm text-accent-blue">{svc.pricing}</span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
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
                  <h3 className="font-syne font-bold text-xl mb-4">{monthLabel}</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <div key={d} className="text-center text-sm font-medium text-text-muted py-2">{d}</div>
                    ))}
                    {generateCalendarDays().map((day, index) => (
                      <button
                        key={index}
                        onClick={() => day && !isPast(day) && setFormData({ ...formData, date: dateStr(day) })}
                        disabled={!day || isPast(day)}
                        className={`aspect-square rounded-lg transition-all ${!day ? 'invisible' :
                            isPast(day) ? 'bg-bg-card text-text-muted opacity-30 cursor-not-allowed' :
                              formData.date === dateStr(day) ? 'bg-accent-blue text-white' :
                                'bg-bg-card hover:bg-accent-blue/20 text-text-primary'
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
                        className={`p-3 rounded-lg font-medium transition-all ${formData.time === time
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
                  <Button variant="secondary" onClick={handleBack}>Back</Button>
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

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

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
                    <Button variant="secondary" onClick={handleBack} type="button">Back</Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Confirm Booking'}
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
