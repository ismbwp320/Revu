import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { Search, Filter, Star, MessageCircle, MapPin, Clock, ChevronRight, Plus, TrendingUp, BookOpen, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ReviewCard from '@/components/ReviewCard';
import { getToken } from '@/lib/secureStore';
// import SignInModal from '@/app/(modals)/sign-in';

async function fetchWithAuth(url: string) {
  const token = await getToken("authToken");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}


const { width } = Dimensions.get('window');


async function fetchPosts() {
  const res = await fetch("https://app.ed-cred.com/school/employees");
  return res.json();
}

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
  const [showModal, setShowModal] = useState(false);



  // const [likes, setLikes] = useState<string[]>([]);

  // const { data: employees, error, isLoading } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  //   // select: (data) =>
  //   //   data.employees.map((employee: any) => ({
  //   //     id: employee.id,
  //   //     institution: employee.name,
  //   //     rating: employee.responses.avgRating || 0,
  //   //     // src: require("../../assets/images/display/image18.png"),
  //   //     role: employee.author?.username || "Unknown",
  //   //     location: employee.responses.details.country || "Unknown",
  //   //     category: employee.category?.name || null,
  //   //     date: employee.createdAt || "Unknown",
  //   //     tags: employee.tags?.map((tag: any) => tag.name) || [],
  //   //     likes: employee.likesCount || 4,
  //   //     comments: employee.responses.comments || 0,
  //   //     // views: employee.viewsCount,
  //   //     // replies: employee.repliesCount,
  //   //   })),
  // });

  const { data: reviews, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });



  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading data, {JSON.stringify(error)}</Text>;


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
              className={`px-4 py-2 rounded-full ${activeFilter === filter.toLowerCase()
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
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text className="text-indigo-600 font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          {/* <SignInModal isOpen={showModal} /> */}
          {/* {JSON.stringify(review)} */}
          {
            reviews.employees.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))
          }

        </View>
      </ScrollView>

      {/* Floating Action Button */}
      {/* <TouchableOpacity className="absolute bottom-6 right-6 bg-indigo-600 p-4 rounded-full shadow-lg">
            <Plus size={24} color="white" />
          </TouchableOpacity> */}
    </View>
  );
}