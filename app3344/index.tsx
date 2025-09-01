// import React from 'react';
// import Gradient from '@/assets/icons/Gradient';
// import Logo from '@/assets/icons/Logo';
// import { Box } from '@/components/ui/box';
// import { ScrollView } from 'react-native';
// import { Text } from '@/components/ui/text';

// import { Button, ButtonText } from '@/components/ui/button';
// import { useRouter } from 'expo-router';

// export default function Home() {
//   const router = useRouter();
//   return (
//     <Box className="flex-1 bg-background-300 h-[100vh]">
//       {/* <ScrollView
//         style={{ height: '100%' }}
//         contentContainerStyle={{ flexGrow: 1 }}
//       > */}
//         <Box className="flex flex-1 items-center mx-5 lg:my-24 lg:mx-32 py-safe">
//           <Box className="gap-10 base:flex-col sm:flex-row justify-between sm:w-[80%] md:flex-1">
//             <Button
//               size="md"
//               className="bg-primary-500 px-6 py-2 rounded-full"
//               onPress={() => {
//                 router.push('/tabs/tab1');
//               }}
//             >
//               <ButtonText>Explore Tab Navigation</ButtonText>
//             </Button>
//           </Box>
//         </Box>
//       {/* </ScrollView> */}
//     </Box>
//   );
// }

    import React, { useState } from 'react';
    import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
    import { Search, Filter, Star, MessageCircle, MapPin, Clock, ChevronRight, Plus, TrendingUp, BookOpen, Users } from 'lucide-react-native';
    import { LinearGradient } from 'expo-linear-gradient';
    import { useRouter } from 'expo-router';

    const { width } = Dimensions.get('window');

    // Mock data for reviews
    const mockReviews = [
      {
        id: '1',
        institution: 'Stanford University',
        rating: 4.8,
        role: 'Computer Science Student',
        location: 'Stanford, CA',
        date: '2 days ago',
        content: 'The computer science program is exceptional with world-class faculty and cutting-edge research opportunities. The collaborative environment really helps students grow.',
        likes: 24,
        comments: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '2',
        institution: 'Harvard Business School',
        rating: 4.5,
        role: 'MBA Student',
        location: 'Boston, MA',
        date: '1 week ago',
        content: 'The case study method is intense but incredibly effective. Professors challenge you to think critically about real business problems. Networking opportunities are unparalleled.',
        likes: 18,
        comments: 3,
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: '3',
        institution: 'MIT',
        rating: 4.9,
        role: 'Research Assistant',
        location: 'Cambridge, MA',
        date: '3 days ago',
        content: 'The research facilities are state-of-the-art. Working with Nobel laureates and industry leaders has been an incredible experience. The interdisciplinary approach is unique.',
        likes: 32,
        comments: 7,
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      },
    ];

    // Mock data for trending discussions
    const trendingDiscussions = [
      { id: '1', title: 'Best MBA programs for entrepreneurship?', replies: 42, category: 'Business' },
      { id: '2', title: 'How to prepare for medical school applications?', replies: 28, category: 'Medicine' },
      { id: '3', title: 'Online vs. in-person computer science programs', replies: 35, category: 'Technology' },
    ];

    // Mock data for categories
    const categories = [
      { id: '1', name: 'Undergraduate', icon: '🎓', count: 124 },
      { id: '2', name: 'Graduate', icon: '📚', count: 89 },
      { id: '3', name: 'Professional', icon: '💼', count: 56 },
      { id: '4', name: 'Online', icon: '💻', count: 72 },
    ];

    export default function HomeScreen() {
      const router = useRouter();
      const [activeFilter, setActiveFilter] = useState('all');

      const renderStars = (rating: number) => {
        return (
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                color={star <= rating ? '#FFD700' : '#E5E7EB'}
                fill={star <= rating ? '#FFD700' : 'none'}
              />
            ))}
          </View>
        );
      };

      return (
        <View className="flex-1 bg-gray-50">
          {/* Header */}
          <LinearGradient
            colors={['#4F46E5', '#7C3AED']}
            className="px-4 pt-12 pb-6 rounded-b-3xl"
          >
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="text-white text-2xl font-bold">EduReview Pro</Text>
                <Text className="text-indigo-100 text-sm">Discover trusted educational insights</Text>
              </View>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full">
                <Users size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4">
              <Search size={20} color="#6B7280" />
              <TextInput
                placeholder="Search institutions, programs..."
                className="flex-1 ml-3 text-gray-900"
              />
              <TouchableOpacity>
                <Filter
                  size={20}
                  color="#6B7280"
                  onPress={() => {
                    router.push('./filter');
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Quick Filters */}
            <View className="flex-row justify-between mb-2">
              {['All', 'Recent', 'Top Rated', 'Trending'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === filter.toLowerCase() 
                      ? 'bg-white' 
                      : 'bg-white/20'
                  }`}
                  onPress={() => setActiveFilter(filter.toLowerCase())}
                >
                  <Text
                    className={
                      activeFilter === filter.toLowerCase()
                        ? 'text-indigo-600 font-medium'
                        : 'text-white font-medium'
                    }
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>

          {/* Main Content */}
          <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
            {/* Stats Overview */}
            <View className="flex-row justify-between mb-6">
              <View className="bg-white rounded-xl p-4 flex-1 mr-2 shadow-sm">
                <Text className="text-gray-500 text-sm">Total Reviews</Text>
                <Text className="text-2xl font-bold text-gray-900">12.4K</Text>
              </View>
              <View className="bg-white rounded-xl p-4 flex-1 mx-2 shadow-sm">
                <Text className="text-gray-500 text-sm">Institutions</Text>
                <Text className="text-2xl font-bold text-gray-900">842</Text>
              </View>
              <View className="bg-white rounded-xl p-4 flex-1 ml-2 shadow-sm">
                <Text className="text-gray-500 text-sm">Verified</Text>
                <Text className="text-2xl font-bold text-gray-900">98%</Text>
              </View>
            </View>

            {/* Categories */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-900 text-lg font-bold">Browse by Category</Text>
                <TouchableOpacity>
                  <Text className="text-indigo-600 font-medium">See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-24">
                <View className="flex-row">
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      className="bg-white rounded-xl p-4 mr-3 flex-row items-center shadow-sm"
                      style={{ width: width * 0.4 }}
                    >
                      <Text className="text-2xl mr-2">{category.icon}</Text>
                      <View>
                        <Text className="font-semibold text-gray-900">{category.name}</Text>
                        <Text className="text-gray-500 text-sm">{category.count} reviews</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Trending Discussions */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-900 text-lg font-bold">Trending Discussions</Text>
                <TouchableOpacity>
                  <Text className="text-indigo-600 font-medium">See all</Text>
                </TouchableOpacity>
              </View>
              <View className="bg-white rounded-xl p-4 shadow-sm">
                <View className="flex-row items-center mb-3">
                  <TrendingUp size={20} color="#4F46E5" />
                  <Text className="text-gray-900 font-semibold ml-2">Hot Topics This Week</Text>
                </View>
                {trendingDiscussions.map((discussion) => (
                  <TouchableOpacity
                    key={discussion.id}
                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                  >
                    <View className="flex-1">
                      <Text className="text-gray-900 font-medium">{discussion.title}</Text>
                      <View className="flex-row items-center mt-1">
                        <Text className="text-gray-500 text-sm">{discussion.replies} replies</Text>
                        <Text className="text-gray-300 mx-2">•</Text>
                        <Text className="text-indigo-600 text-sm">{discussion.category}</Text>
                      </View>
                    </View>
                    <ChevronRight size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity className="flex-row items-center justify-center mt-2 pt-2">
                  <Text
                    className="text-indigo-600 font-medium"
                    onPress={() => {
                      router.push('./review-detail');
                    }}
                  >View all discussions</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recent Reviews */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-900 text-lg font-bold">Recent Reviews</Text>
                <TouchableOpacity>
                  <Text className="text-indigo-600 font-medium">See all</Text>
                </TouchableOpacity>
              </View>
              {mockReviews.map((review) => (
                <View key={review.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                  <View className="flex-row mb-3">
                    <Image
                      source={{ uri: review.avatar }}
                      className="w-10 h-10 rounded-full"
                    />
                    <View className="ml-3 flex-1">
                      <Text className="font-bold text-gray-900">{review.institution}</Text>
                      <View className="flex-row items-center">
                        <Text className="text-gray-600 text-sm">{review.role}</Text>
                        <Text className="text-gray-300 mx-2">•</Text>
                        <View className="flex-row items-center">
                          <MapPin size={12} color="#9CA3AF" />
                          <Text className="text-gray-500 text-sm ml-1">{review.location}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center mb-2">
                    {renderStars(review.rating)}
                    <Text className="text-gray-900 font-bold ml-2">{review.rating}</Text>
                    <Text className="text-gray-500 text-sm ml-2">• {review.date}</Text>
                  </View>

                  <Text className="text-gray-700 mb-3">{review.content}</Text>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row">
                      <TouchableOpacity className="flex-row items-center mr-4">
                        <Star size={16} color="#9CA3AF" />
                        <Text className="text-gray-500 text-sm ml-1">{review.likes}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center">
                        <MessageCircle size={16} color="#9CA3AF" />
                        <Text className="text-gray-500 text-sm ml-1">{review.comments}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <Text
                        className="text-indigo-600 text-sm font-medium"
                        onPress={() => {
                          router.push('./review-detail');
                        }}
                      >Read more</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Floating Action Button */}
          <TouchableOpacity className="absolute bottom-6 right-6 bg-indigo-600 p-4 rounded-full shadow-lg">
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    }