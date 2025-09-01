import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  GraduationCap, 
  Users, 
  Calendar, 
  Award,
  Building2,
  Globe,
  Phone,
  Mail,
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data for the institution profile
const institutionData = {
  id: '1',
  name: 'Stanford University',
  logo: 'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3R1ZGVudCUyMGxlYXJuZXIlMjBwdXBpbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
  coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D',
  rating: 4.8,
  reviewCount: 1242,
  location: 'Stanford, California',
  website: 'www.stanford.edu',
  phone: '(650) 723-2091',
  email: 'info@stanford.edu',
  type: 'Private Research University',
  established: '1885',
  studentCount: '17,381',
  campusSize: '8,180 acres',
  description: 'Stanford University is one of the world\'s leading teaching and research universities. Since its opening in 1891, Stanford has been dedicated to finding solutions to big challenges and to preparing students for leadership in a complex world.',
  categories: ['Undergraduate', 'Graduate', 'Research', 'Technology'],
  overallStats: {
    academics: 4.9,
    campus: 4.7,
    facilities: 4.8,
    career: 4.9,
    diversity: 4.6
  }
};

// Mock data for institution photos
const institutionPhotos = [
  'https://images.unsplash.com/photo-1527822618093-743f3e57977c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2xhc3Nyb29tJTIwbGVhcm5pbmclMjBlbnZpcm9ubWVudHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TGlicmFyeSUyMHJlc2VhcmNofGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1659070953831-dd4fa16222fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFNjaG9vbCUyMGNsYXNzcm9vbSUyMGxlYXJuaW5nfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1552256028-2c58c3cbfa7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNpZW5jZSUyMGxhYm9yYXRvcnklMjBleHBlcmltZW50fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3R1ZGVudCUyMGxlYXJuZXIlMjBwdXBpbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D'
];

// Mock data for recent reviews
const recentReviews = [
  {
    id: '1',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    role: 'Computer Science Student',
    rating: 5,
    date: '2 days ago',
    content: 'The computer science program is exceptional with world-class faculty and cutting-edge research opportunities.',
    likes: 24,
    comments: 5
  },
  {
    id: '2',
    userName: 'Sarah Miller',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'MBA Student',
    rating: 4.5,
    date: '1 week ago',
    content: 'The case study method is intense but incredibly effective. Professors challenge you to think critically.',
    likes: 18,
    comments: 3
  },
  {
    id: '3',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    role: 'Research Assistant',
    rating: 4.9,
    date: '3 days ago',
    content: 'The research facilities are state-of-the-art. Working with Nobel laureates has been incredible.',
    likes: 32,
    comments: 7
  }
];

export default function InstitutionProfileScreen() {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

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
        className="px-4 pt-12 pb-4"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="p-2 -ml-2">
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Institution Profile</Text>
          <View className="flex-row">
            <TouchableOpacity className="p-2 mr-2">
              <Share2 size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="p-2"
              onPress={() => setLiked(!liked)}
            >
              <Heart 
                size={20} 
                color={liked ? '#EF4444' : 'white'} 
                fill={liked ? '#EF4444' : 'none'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image */}
        <View className="relative">
          <Image
            source={{ uri: institutionData.coverImage }}
            className="w-full h-48"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 left-0 right-0 h-20"
          />
        </View>

        {/* Institution Info */}
        <View className="bg-white rounded-b-3xl px-4 pt-6 pb-8 -mt-8 relative z-10 shadow-lg">
          <View className="flex-row items-end mb-4">
            <Image
              source={{ uri: institutionData.logo }}
              className="w-20 h-20 rounded-xl border-4 border-white shadow-lg"
            />
            <View className="ml-4 flex-1">
              <Text className="text-gray-900 text-xl font-bold">{institutionData.name}</Text>
              <View className="flex-row items-center mt-1">
                {renderStars(institutionData.rating)}
                <Text className="text-gray-900 font-bold ml-1">{institutionData.rating}</Text>
                <Text className="text-gray-500 text-sm ml-2">({institutionData.reviewCount} reviews)</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <MapPin size={14} color="#9CA3AF" />
                <Text className="text-gray-600 text-sm ml-1">{institutionData.location}</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mt-2">
            <TouchableOpacity className="bg-indigo-100 rounded-lg px-4 py-2 flex-1 mr-2">
              <Text
                className="text-indigo-700 text-center font-medium"
                onPress={() => {
                  router.push('./submit-review');
                }}
                >Write Review</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-indigo-600 rounded-lg px-4 py-2 flex-1 ml-2">
              <Text className="text-white text-center font-medium">Visit Website</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Overall Ratings */}
        <View className="bg-white rounded-2xl p-4 mx-4 mt-6 mb-4 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-900 text-lg font-bold">Overall Ratings</Text>
            <Text className="text-indigo-600 font-bold text-lg">{institutionData.rating}</Text>
          </View>
          
          <View className="space-y-3">
            <View>
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-gray-700">Academics</Text>
                <Text className="text-gray-900 font-medium">{institutionData.overallStats.academics}</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full">
                <View 
                  className="h-2 bg-indigo-500 rounded-full" 
                  style={{ width: `${(institutionData.overallStats.academics / 5) * 100}%` }}
                />
              </View>
            </View>
            
            <View>
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-gray-700">Campus</Text>
                <Text className="text-gray-900 font-medium">{institutionData.overallStats.campus}</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full">
                <View 
                  className="h-2 bg-indigo-500 rounded-full" 
                  style={{ width: `${(institutionData.overallStats.campus / 5) * 100}%` }}
                />
              </View>
            </View>
            
            <View>
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-gray-700">Facilities</Text>
                <Text className="text-gray-900 font-medium">{institutionData.overallStats.facilities}</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full">
                <View 
                  className="h-2 bg-indigo-500 rounded-full" 
                  style={{ width: `${(institutionData.overallStats.facilities / 5) * 100}%` }}
                />
              </View>
            </View>
            
            <View>
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-gray-700">Career Services</Text>
                <Text className="text-gray-900 font-medium">{institutionData.overallStats.career}</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full">
                <View 
                  className="h-2 bg-indigo-500 rounded-full" 
                  style={{ width: `${(institutionData.overallStats.career / 5) * 100}%` }}
                />
              </View>
            </View>
            
            <View>
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-gray-700">Diversity</Text>
                <Text className="text-gray-900 font-medium">{institutionData.overallStats.diversity}</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full">
                <View 
                  className="h-2 bg-indigo-500 rounded-full" 
                  style={{ width: `${(institutionData.overallStats.diversity / 5) * 100}%` }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Info Cards */}
        <View className="flex-row flex-wrap justify-between mx-4 mb-4">
          <View className="bg-white rounded-2xl p-4 w-[48%] mb-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <GraduationCap size={20} color="#4F46E5" />
              <Text className="text-gray-900 font-bold ml-2">Students</Text>
            </View>
            <Text className="text-gray-700 text-xl font-bold">{institutionData.studentCount}</Text>
          </View>
          
          <View className="bg-white rounded-2xl p-4 w-[48%] mb-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Building2 size={20} color="#4F46E5" />
              <Text className="text-gray-900 font-bold ml-2">Campus</Text>
            </View>
            <Text className="text-gray-700 text-xl font-bold">{institutionData.campusSize}</Text>
          </View>
          
          <View className="bg-white rounded-2xl p-4 w-[48%] mb-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Calendar size={20} color="#4F46E5" />
              <Text className="text-gray-900 font-bold ml-2">Founded</Text>
            </View>
            <Text className="text-gray-700 text-xl font-bold">{institutionData.established}</Text>
          </View>
          
          <View className="bg-white rounded-2xl p-4 w-[48%] mb-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Award size={20} color="#4F46E5" />
              <Text className="text-gray-900 font-bold ml-2">Type</Text>
            </View>
            <Text className="text-gray-700 text-base font-bold">{institutionData.type}</Text>
          </View>
        </View>

        {/* Description */}
        <View className="bg-white rounded-2xl p-4 mx-4 mb-4 shadow-sm">
          <Text className="text-gray-900 text-lg font-bold mb-2">About</Text>
          <Text className="text-gray-700 leading-6">{institutionData.description}</Text>
        </View>

        {/* Categories */}
        <View className="bg-white rounded-2xl p-4 mx-4 mb-4 shadow-sm">
          <Text className="text-gray-900 text-lg font-bold mb-3">Categories</Text>
          <View className="flex-row flex-wrap">
            {institutionData.categories.map((category, index) => (
              <View 
                key={index} 
                className="bg-indigo-100 rounded-full px-4 py-2 mr-2 mb-2"
              >
                <Text className="text-indigo-700 text-sm font-medium">{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Photos */}
        <View className="bg-white rounded-2xl p-4 mx-4 mb-4 shadow-sm">
          <Text className="text-gray-900 text-lg font-bold mb-3">Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-40">
            <View className="flex-row">
              {institutionPhotos.map((photo, index) => (
                <Image
                  key={index}
                  source={{ uri: photo }}
                  className="w-32 h-32 rounded-xl mr-3"
                  resizeMode="cover"
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Contact Info */}
        <View className="bg-white rounded-2xl p-4 mx-4 mb-4 shadow-sm">
          <Text className="text-gray-900 text-lg font-bold mb-3">Contact Information</Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Globe size={20} color="#4F46E5" />
              <Text className="text-gray-700 ml-3">{institutionData.website}</Text>
            </View>
            <View className="flex-row items-center">
              <Phone size={20} color="#4F46E5" />
              <Text className="text-gray-700 ml-3">{institutionData.phone}</Text>
            </View>
            <View className="flex-row items-center">
              <Mail size={20} color="#4F46E5" />
              <Text className="text-gray-700 ml-3">{institutionData.email}</Text>
            </View>
          </View>
        </View>

        {/* Recent Reviews */}
        <View className="bg-white rounded-2xl p-4 mx-4 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 text-lg font-bold">Recent Reviews</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          
          {recentReviews.map((review) => (
            <View key={review.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
              <View className="flex-row mb-2">
                <Image
                  source={{ uri: review.userAvatar }}
                  className="w-10 h-10 rounded-full"
                />
                <View className="ml-3 flex-1">
                  <Text className="font-bold text-gray-900">{review.userName}</Text>
                  <Text className="text-gray-600 text-sm">{review.role}</Text>
                </View>
                <Text className="text-gray-500 text-sm">{review.date}</Text>
              </View>

              <View className="flex-row items-center mb-2">
                {renderStars(review.rating)}
                <Text className="text-gray-900 font-bold ml-2">{review.rating}</Text>
              </View>

              <Text className="text-gray-700 mb-3">{review.content}</Text>

              <View className="flex-row items-center justify-between">
                <View className="flex-row">
                  <TouchableOpacity className="flex-row items-center mr-4">
                    <ThumbsUp size={16} color="#9CA3AF" />
                    <Text className="text-gray-500 text-sm ml-1">{review.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center">
                    <MessageCircle size={16} color="#9CA3AF" />
                    <Text className="text-gray-500 text-sm ml-1">{review.comments}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Text className="text-indigo-600 text-sm font-medium">Read more</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}