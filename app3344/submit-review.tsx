import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Check, Eye, EyeOff, MapPin, Building, User, FileText } from 'lucide-react-native';

const SubmitReviewScreen = () => {
  // Form state
  const [institution, setInstitution] = useState('');
  const [rating, setRating] = useState(0);
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState({
    institution: '',
    rating: '',
    role: '',
    feedback: '',
  });

  // Roles options
  const roles = [
    'Undergraduate Student',
    'Graduate Student',
    'Faculty',
    'Staff',
    'Alumni',
    'Parent',
    'Prospective Student',
  ];

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { institution: '', rating: '', role: '', feedback: '' };

    if (!institution.trim()) {
      newErrors.institution = 'Institution name is required';
      isValid = false;
    }

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
      isValid = false;
    }

    if (!role) {
      newErrors.role = 'Please select your role';
      isValid = false;
    }

    if (!feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
      isValid = false;
    } else if (feedback.length < 20) {
      newErrors.feedback = 'Feedback must be at least 20 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  // Submit review
  const submitReview = () => {
    // In a real app, this would send data to an API
    Alert.alert(
      'Review Submitted',
      'Thank you for your review! It will be visible after moderation.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setInstitution('');
            setRating(0);
            setRole('');
            setLocation('');
            setFeedback('');
            setAnonymous(true);
            setShowPreview(false);
          },
        },
      ]
    );
  };

  // Render star rating
  const renderStars = () => {
    return (
      <View className="flex-row justify-center my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            className="mx-1"
          >
            <Star
              size={36}
              color={star <= rating ? '#FFD700' : '#E5E7EB'}
              fill={star <= rating ? '#FFD700' : 'none'}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render role options
  const renderRoleOptions = () => {
    return (
      <View className="flex-row flex-wrap">
        {roles.map((roleOption, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setRole(roleOption)}
            className={`px-4 py-2 rounded-full my-1 mr-2 ${
              role === roleOption
                ? 'bg-indigo-100 border border-indigo-500'
                : 'bg-gray-100 border border-gray-300'
            }`}
          >
            <Text
              className={`${
                role === roleOption ? 'text-indigo-700' : 'text-gray-700'
              }`}
            >
              {roleOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (showPreview) {
    return (
      <ScrollView className="flex-1 bg-gray-50">
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          className="px-6 py-8"
        >
          <Text className="text-2xl font-bold text-white text-center">
            Review Preview
          </Text>
          <Text className="text-indigo-100 text-center mt-2">
            Please review your submission before submitting
          </Text>
        </LinearGradient>

        <View className="p-6">
          <View className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <View className="flex-row items-center mb-4">
              <Building size={20} color="#4F46E5" />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                {institution}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 font-medium mb-2">Rating</Text>
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    color={star <= rating ? '#FFD700' : '#E5E7EB'}
                    fill={star <= rating ? '#FFD700' : 'none'}
                    strokeWidth={1.5}
                  />
                ))}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 font-medium mb-2">Role</Text>
              <Text className="text-gray-800">{role}</Text>
            </View>

            {location ? (
              <View className="mb-4">
                <Text className="text-gray-600 font-medium mb-2">Location</Text>
                <View className="flex-row items-center">
                  <MapPin size={16} color="#6B7280" />
                  <Text className="text-gray-800 ml-1">{location}</Text>
                </View>
              </View>
            ) : null}

            <View className="mb-4">
              <Text className="text-gray-600 font-medium mb-2">Feedback</Text>
              <Text className="text-gray-800">{feedback}</Text>
            </View>

            <View className="flex-row items-center mt-6">
              <Text className="text-gray-600 font-medium mr-2">
                Anonymous Submission:
              </Text>
              <Text className="text-gray-800 font-medium">
                {anonymous ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>

          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setShowPreview(false)}
              className="flex-1 bg-gray-200 rounded-xl py-4 mr-2 items-center"
            >
              <Text className="text-gray-800 font-semibold">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submitReview}
              className="flex-1 bg-indigo-600 rounded-xl py-4 ml-2 items-center"
            >
              <Text className="text-white font-semibold">Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        className="px-6 py-8"
      >
        <Text className="text-2xl font-bold text-white text-center">
          Submit Anonymous Review
        </Text>
        <Text className="text-indigo-100 text-center mt-2">
          Share your experience with an educational institution
        </Text>
      </LinearGradient>

      <View className="p-6">
        {/* Institution Field */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Building size={20} color="#4F46E5" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">
              Institution
            </Text>
          </View>
          <TextInput
            value={institution}
            onChangeText={setInstitution}
            placeholder="Enter institution name"
            className={`border rounded-xl px-4 py-3 ${
              errors.institution ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.institution ? (
            <Text className="text-red-500 mt-1">{errors.institution}</Text>
          ) : null}
        </View>

        {/* Rating Field */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Star size={20} color="#4F46E5" fill="#4F46E5" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">
              Rating
            </Text>
          </View>
          {renderStars()}
          {errors.rating ? (
            <Text className="text-red-500 text-center mt-1">{errors.rating}</Text>
          ) : null}
        </View>

        {/* Role Field */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <User size={20} color="#4F46E5" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">Role</Text>
          </View>
          {renderRoleOptions()}
          {errors.role ? (
            <Text className="text-red-500 mt-1">{errors.role}</Text>
          ) : null}
        </View>

        {/* Location Field */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <MapPin size={20} color="#4F46E5" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">
              Location (Optional)
            </Text>
          </View>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location (city, state)"
            className="border border-gray-300 rounded-xl px-4 py-3"
          />
        </View>

        {/* Feedback Field */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <FileText size={20} color="#4F46E5" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">
              Feedback
            </Text>
          </View>
          <TextInput
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Share your detailed feedback (min. 20 characters)"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            className={`border rounded-xl px-4 py-3 h-32 ${
              errors.feedback ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.feedback ? (
            <Text className="text-red-500 mt-1">{errors.feedback}</Text>
          ) : null}
          <Text className="text-gray-500 text-sm mt-1">
            Your feedback will be visible to other users
          </Text>
        </View>

        {/* Anonymous Toggle */}
        <View className="mb-8 flex-row items-center justify-between">
          <Text className="text-gray-800 font-medium">
            Submit Anonymously
          </Text>
          <Switch
            value={anonymous}
            onValueChange={setAnonymous}
            trackColor={{ false: '#E5E7EB', true: '#7C3AED' }}
            thumbColor={anonymous ? '#4F46E5' : '#F3F4F6'}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-indigo-600 rounded-xl py-4 items-center shadow-sm"
        >
          <View className="flex-row items-center">
            <Eye size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Preview Review</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SubmitReviewScreen;