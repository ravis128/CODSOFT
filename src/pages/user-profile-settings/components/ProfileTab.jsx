import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileTab = ({ profileData, onProfileUpdate }) => {
  const [formData, setFormData] = useState(profileData);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const timezones = [
    { value: 'UTC-12:00', label: '(UTC-12:00) International Date Line West' },
    { value: 'UTC-11:00', label: '(UTC-11:00) Coordinated Universal Time-11' },
    { value: 'UTC-10:00', label: '(UTC-10:00) Hawaii' },
    { value: 'UTC-09:00', label: '(UTC-09:00) Alaska' },
    { value: 'UTC-08:00', label: '(UTC-08:00) Pacific Time (US & Canada)' },
    { value: 'UTC-07:00', label: '(UTC-07:00) Mountain Time (US & Canada)' },
    { value: 'UTC-06:00', label: '(UTC-06:00) Central Time (US & Canada)' },
    { value: 'UTC-05:00', label: '(UTC-05:00) Eastern Time (US & Canada)' },
    { value: 'UTC-04:00', label: '(UTC-04:00) Atlantic Time (Canada)' },
    { value: 'UTC-03:00', label: '(UTC-03:00) Brasilia' },
    { value: 'UTC-02:00', label: '(UTC-02:00) Coordinated Universal Time-02' },
    { value: 'UTC-01:00', label: '(UTC-01:00) Azores' },
    { value: 'UTC+00:00', label: '(UTC+00:00) London, Dublin, Edinburgh' },
    { value: 'UTC+01:00', label: '(UTC+01:00) Amsterdam, Berlin, Rome' },
    { value: 'UTC+02:00', label: '(UTC+02:00) Athens, Istanbul, Minsk' },
    { value: 'UTC+03:00', label: '(UTC+03:00) Kuwait, Riyadh' },
    { value: 'UTC+04:00', label: '(UTC+04:00) Abu Dhabi, Muscat' },
    { value: 'UTC+05:00', label: '(UTC+05:00) Islamabad, Karachi' },
    { value: 'UTC+05:30', label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi' },
    { value: 'UTC+06:00', label: '(UTC+06:00) Astana, Dhaka' },
    { value: 'UTC+07:00', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta' },
    { value: 'UTC+08:00', label: '(UTC+08:00) Beijing, Perth, Singapore' },
    { value: 'UTC+09:00', label: '(UTC+09:00) Osaka, Sapporo, Tokyo' },
    { value: 'UTC+10:00', label: '(UTC+10:00) Canberra, Melbourne, Sydney' },
    { value: 'UTC+11:00', label: '(UTC+11:00) Magadan, Solomon Is.' },
    { value: 'UTC+12:00', label: '(UTC+12:00) Auckland, Wellington' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempAvatar(e?.target?.result);
        setShowCropModal(true);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleCropConfirm = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        avatar: tempAvatar
      }));
      setIsUploading(false);
      setShowCropModal(false);
      setTempAvatar(null);
    }, 2000);
  };

  const handleSave = () => {
    onProfileUpdate(formData);
  };

  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
              {formData?.avatar ? (
                <Image
                  src={formData?.avatar}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-muted-foreground" />
                </div>
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={24} className="text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              Upload a professional photo that represents you well. Recommended size: 400x400px.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleAvatarClick}
                iconName="Upload"
                iconPosition="left"
                iconSize={16}
              >
                Upload Photo
              </Button>
              {formData?.avatar && (
                <Button
                  variant="ghost"
                  onClick={() => handleInputChange('avatar', null)}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={16}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      {/* Personal Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            placeholder="Enter your first name"
            required
          />
          <Input
            label="Last Name"
            type="text"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            placeholder="Enter your last name"
            required
          />
          <Input
            label="Job Title"
            type="text"
            value={formData?.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
            placeholder="e.g., Senior Project Manager"
            className="md:col-span-2"
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              value={formData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              placeholder="Tell us about yourself and your role..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData?.bio?.length || 0}/500 characters
            </p>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            placeholder="your.email@company.com"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Department"
            type="text"
            value={formData?.department}
            onChange={(e) => handleInputChange('department', e?.target?.value)}
            placeholder="e.g., Engineering, Marketing"
          />
          <Input
            label="Location"
            type="text"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            placeholder="e.g., New York, NY"
          />
        </div>
      </div>
      {/* Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Timezone"
            options={timezones}
            value={formData?.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            searchable
            placeholder="Select your timezone"
          />
          <Select
            label="Language"
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
              { value: 'it', label: 'Italian' },
              { value: 'pt', label: 'Portuguese' },
              { value: 'zh', label: 'Chinese' },
              { value: 'ja', label: 'Japanese' }
            ]}
            value={formData?.language}
            onChange={(value) => handleInputChange('language', value)}
            placeholder="Select language"
          />
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Save Changes
        </Button>
      </div>
      {/* Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Crop Profile Photo</h3>
            <div className="mb-6">
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {tempAvatar && (
                  <Image
                    src={tempAvatar}
                    alt="Avatar preview"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCropModal(false);
                  setTempAvatar(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleCropConfirm}
                loading={isUploading}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;