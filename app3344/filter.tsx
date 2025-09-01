import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ChevronLeft, X, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FilterScreen() {
  // Filter states
  const [institutionType, setInstitutionType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(5);
  const [role, setRole] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');

  // Options for dropdowns
  const institutionTypes = [
    'University',
    'College',
    'Graduate School',
    'Online Program',
    'Bootcamp',
    'Professional School'
  ];

  const roles = [
    'Undergraduate Student',
    'Graduate Student',
    'PhD Student',
    'Postdoctoral Fellow',
    'Faculty',
    'Staff',
    'Alumni',
    'Parent'
  ];

  const dateRanges = [
    'Any Time',
    'Last Week',
    'Last Month',
    'Last 3 Months',
    'Last 6 Months',
    'Last Year'
  ];

  const handleApplyFilters = () => {
    // In a real app, this would trigger a search with the selected filters
    console.log({
      institutionType,
      location,
      minRating,
      maxRating,
      role,
      dateRange
    });
    // Navigation would happen here
  };

  const handleClearFilters = () => {
    setInstitutionType('');
    setLocation('');
    setMinRating(0);
    setMaxRating(5);
    setRole('');
    setDateRange('');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        className="px-4 pt-12 pb-4"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="p-2 -ml-2">
            <ChevronLeft size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Filters</Text>
          <TouchableOpacity onPress={handleClearFilters}>
            <Text className="text-white text-base font-medium">Clear All</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter Options */}
      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {/* Institution Type */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-bold mb-3">Institution Type</Text>
          <View className="flex-row flex-wrap">
            {institutionTypes.map((type) => (
              <TouchableOpacity
                key={type}
                className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                  institutionType === type
                    ? 'bg-indigo-600'
                    : 'bg-white border border-gray-200'
                }`}
                onPress={() => setInstitutionType(institutionType === type ? '' : type)}
              >
                <Text
                  className={
                    institutionType === type ? 'text-white font-medium' : 'text-gray-700'
                  }
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-bold mb-3">Location</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <TextInput
              placeholder="Enter city, state, or country"
              value={location}
              onChangeText={setLocation}
              className="text-gray-900"
            />
          </View>
        </View>

        {/* Rating Range */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-bold mb-3">Rating Range</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-700">Minimum Rating</Text>
              <Text className="text-indigo-600 font-bold">{minRating}.0</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    minRating === rating ? 'bg-indigo-100' : ''
                  }`}
                  onPress={() => setMinRating(rating)}
                >
                  <Text
                    className={`text-lg font-bold ${
                      minRating === rating ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    {rating}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row items-center justify-between mt-6 mb-4">
              <Text className="text-gray-700">Maximum Rating</Text>
              <Text className="text-indigo-600 font-bold">{maxRating}.0</Text>
            </View>
            <View className="flex-row justify-between">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    maxRating === rating ? 'bg-indigo-100' : ''
                  }`}
                  onPress={() => setMaxRating(rating)}
                >
                  <Text
                    className={`text-lg font-bold ${
                      maxRating === rating ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    {rating}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Role */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-bold mb-3">Role</Text>
          <View className="bg-white rounded-xl shadow-sm">
            {roles.map((roleOption, index) => (
              <TouchableOpacity
                key={roleOption}
                className={`flex-row items-center justify-between p-4 ${
                  index !== roles.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onPress={() => setRole(role === roleOption ? '' : roleOption)}
              >
                <Text
                  className={`text-base ${
                    role === roleOption ? 'text-indigo-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {roleOption}
                </Text>
                {role === roleOption ? (
                  <Check size={20} color="#4F46E5" />
                ) : (
                  <View className="w-5 h-5 rounded-full border border-gray-300" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date Range */}
        <View className="mb-8">
          <Text className="text-gray-900 text-lg font-bold mb-3">Date Range</Text>
          <View className="bg-white rounded-xl shadow-sm">
            {dateRanges.map((range, index) => (
              <TouchableOpacity
                key={range}
                className={`flex-row items-center justify-between p-4 ${
                  index !== dateRanges.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onPress={() => setDateRange(range === dateRange ? '' : range)}
              >
                <Text
                  className={`text-base ${
                    dateRange === range ? 'text-indigo-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {range}
                </Text>
                {dateRange === range ? (
                  <Check size={20} color="#4F46E5" />
                ) : (
                  <View className="w-5 h-5 rounded-full border border-gray-300" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View className="px-4 pb-6">
        <TouchableOpacity
          className="bg-indigo-600 rounded-xl py-4 items-center justify-center"
          onPress={handleApplyFilters}
        >
          <Text className="text-white text-base font-bold">Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}