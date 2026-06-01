import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Initialize profile data from localStorage or defaults
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      name: 'Admin User',
      email: 'admin@bitforge.com',
      role: 'System Administrator',
      phone: '+1 (555) 123-4567',
      department: 'IT Management',
      location: 'San Francisco, CA',
      bio: 'Experienced system administrator with a passion for technology and innovation.',
      avatar: '',
      initials: 'AU',
      joinDate: '2024-01-15',
    };
  });

  const [formData, setFormData] = useState(profileData);

  // Generate initials from name
  const generateInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && { initials: generateInitials(value) })
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'File size must be less than 2MB' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'Please upload an image file' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        setErrors(prev => ({ ...prev, avatar: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove avatar
  const handleRemoveAvatar = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('adminProfile', JSON.stringify(formData));
      setProfileData(formData);
      setIsEditing(false);
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-syne font-bold text-4xl mb-2">Admin Profile</h1>
        <p className="text-text-muted">Manage your personal information and preferences</p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-green-400 font-medium">Profile updated successfully!</span>
        </div>
      )}

      {/* Profile Card */}
      <Card className="p-8">
        {/* Avatar Section */}
        <div className="flex items-start gap-8 mb-8 pb-8 border-b border-border-color">
          <div className="flex-shrink-0">
            {formData.avatar ? (
              <div className="relative group">
                <img 
                  src={formData.avatar} 
                  alt={formData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-accent-blue"
                />
                {isEditing && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center border-4 border-accent-blue">
                <span className="font-syne font-bold text-4xl text-white">
                  {formData.initials}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-syne font-bold text-2xl mb-1">{profileData.name}</h2>
                <p className="text-text-muted">{profileData.role}</p>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="btn-primary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </Button>
              )}
            </div>

            {isEditing && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2">
                    PROFILE PHOTO
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="block w-full text-sm text-text-muted
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-medium
                      file:bg-accent-blue file:text-white
                      file:cursor-pointer file:transition-all
                      hover:file:bg-accent-blue-glow
                      cursor-pointer"
                  />
                  {errors.avatar && (
                    <p className="text-red-400 text-sm mt-1">{errors.avatar}</p>
                  )}
                  <p className="text-text-muted text-xs mt-1">
                    Recommended: Square image, at least 400x400px, max 2MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              FULL NAME *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary font-medium">{profileData.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              EMAIL ADDRESS *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary font-medium">{profileData.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              ROLE *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter your role"
                  className={errors.role ? 'border-red-500' : ''}
                />
                {errors.role && (
                  <p className="text-red-400 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary font-medium">{profileData.role}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              PHONE NUMBER
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary font-medium">{profileData.phone || 'Not provided'}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              DEPARTMENT
            </label>
            {isEditing ? (
              <Input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter your department"
              />
            ) : (
              <p className="text-text-primary font-medium">{profileData.department || 'Not provided'}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              LOCATION
            </label>
            {isEditing ? (
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            ) : (
              <p className="text-text-primary font-medium">{profileData.location || 'Not provided'}</p>
            )}
          </div>

          {/* Join Date */}
          <div className="md:col-span-2">
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              MEMBER SINCE
            </label>
            <p className="text-text-primary font-medium">
              {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-jetbrains text-text-muted mb-2">
              BIO
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="4"
                className="w-full px-4 py-3 bg-bg-card border border-border-color rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
              />
            ) : (
              <p className="text-text-primary">{profileData.bio || 'No bio provided'}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border-color">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </Button>
            <Button 
              onClick={handleCancel}
              disabled={isSaving}
              className="btn-secondary"
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Account Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-blue/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-syne font-bold text-xl">Account Security</h3>
          </div>
          <p className="text-text-muted text-sm mb-4">
            Manage your password and security settings
          </p>
          <button className="text-accent-blue hover:text-accent-blue-glow transition-colors text-sm font-medium">
            Change Password →
          </button>
        </Card>

        {/* Activity Log */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-syne font-bold text-xl">Activity Log</h3>
          </div>
          <p className="text-text-muted text-sm mb-4">
            View your recent account activity and login history
          </p>
          <button className="text-accent-blue hover:text-accent-blue-glow transition-colors text-sm font-medium">
            View Activity →
          </button>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
