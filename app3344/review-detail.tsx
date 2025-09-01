import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { 
  ArrowLeft, 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MapPin, 
  Clock, 
  GraduationCap, 
  Building2,
  User,
  Calendar
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data for the detailed review
const mockReview = {
  id: '1',
  institution: {
    name: 'Stanford University',
    logo: 'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3R1ZGVudCUyMGxlYXJuZXIlMjBwdXBpbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.8,
    reviewCount: 1242,
    location: 'Stanford, CA',
    type: 'Private University'
  },
  user: {
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    role: 'Computer Science Student',
    verified: true
  },
  review: {
    rating: 5,
    date: 'March 15, 2023',
    title: 'Exceptional Computer Science Program',
    content: 'The computer science program at Stanford is truly exceptional. The faculty are world-class researchers who are actively working on cutting-edge technologies. I particularly enjoyed the machine learning and artificial intelligence courses.\n\nThe collaborative environment here is unparalleled. Students work together on projects, share knowledge, and help each other succeed. The resources available to students are top-notch, including access to advanced computing facilities and research labs.\n\nThe career services team is also incredibly supportive, helping students secure internships and full-time positions at leading tech companies. The alumni network is strong and always willing to help current students.\n\nMy only minor complaint would be the competitive nature of some courses, but that also pushes you to perform at your best. Overall, I would highly recommend Stanford\'s computer science program to anyone looking to advance their career in technology.',
    pros: [
      'World-class faculty and research opportunities',
      'Excellent collaborative learning environment',
      'Strong career services and alumni network',
      'Access to cutting-edge technology and facilities'
    ],
    cons: [
      'Highly competitive atmosphere can be stressful',
      'Expensive tuition fees'
    ],
    likes: 24,
    comments: 5
  }
};

// Mock data for related reviews
const relatedReviews = [
  {
    id: '2',
    institution: 'Stanford University',
    rating: 4.7,
    role: 'MBA Student',
    date: '2 weeks ago',
    content: 'The business school is outstanding with incredible networking opportunities.',
    likes: 18,
    comments: 3,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '3',
    institution: 'MIT',
    rating: 4.9,
    role: 'Research Assistant',
    date: '1 month ago',
    content: 'Research facilities are state-of-the-art with Nobel laureates.',
    likes: 32,
    comments: 7,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '4',
    institution: 'Harvard University',
    rating: 4.6,
    role: 'Undergraduate',
    date: '3 weeks ago',
    content: 'Liberal arts program is comprehensive with excellent professors.',
    likes: 15,
    comments: 4,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  }
];

export default function ReviewDetailScreen() {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(mockReview.review.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

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
          <Text className="text-white text-lg font-bold">Review Details</Text>
          <View className="w-8" />
        </View>
      </LinearGradient>

      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
      >
        {/* Institution Header */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: mockReview.institution.logo }}
              className="w-16 h-16 rounded-xl"
            />
            <View className="ml-3 flex-1">
              <View className="flex-row items-center justify-between">
                <Text
                    className="font-bold text-gray-900 text-lg"
                    onPress={() => {
                      router.push('./institution-profile');
                    }}
                >{mockReview.institution.name}</Text>
                <TouchableOpacity onPress={() => setBookmarked(!bookmarked)}>
                  <Bookmark 
                    size={20} 
                    color={bookmarked ? '#4F46E5' : '#9CA3AF'} 
                    fill={bookmarked ? '#4F46E5' : 'none'} 
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center mt-1">
                {renderStars(mockReview.institution.rating)}
                <Text className="text-gray-900 font-bold ml-1">{mockReview.institution.rating}</Text>
                <Text className="text-gray-500 text-sm ml-2">({mockReview.institution.reviewCount} reviews)</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <MapPin size={14} color="#9CA3AF" />
                <Text className="text-gray-600 text-sm ml-1">{mockReview.institution.location}</Text>
                <Text className="text-gray-300 mx-2">•</Text>
                <Text className="text-gray-600 text-sm">{mockReview.institution.type}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Review */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          {/* User Info */}
          <View className="flex-row mb-4">
            <Image
              source={{ uri: mockReview.user.avatar }}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className="font-bold text-gray-900">{mockReview.user.name}</Text>
                {mockReview.user.verified && (
                  <View className="bg-indigo-100 rounded-full px-2 py-1 ml-2">
                    <Text className="text-indigo-600 text-xs font-medium">Verified</Text>
                  </View>
                )}
              </View>
              <Text className="text-gray-600 text-sm">{mockReview.user.role}</Text>
              <View className="flex-row items-center mt-1">
                <Calendar size={14} color="#9CA3AF" />
                <Text className="text-gray-500 text-sm ml-1">{mockReview.review.date}</Text>
              </View>
            </View>
          </View>

          {/* Review Rating */}
          <View className="flex-row items-center mb-3">
            {renderStars(mockReview.review.rating)}
            <Text className="text-gray-900 font-bold ml-2">{mockReview.review.rating}/5</Text>
          </View>

          {/* Review Title */}
          <Text className="text-gray-900 font-bold text-lg mb-3">{mockReview.review.title}</Text>

          {/* Review Content */}
          <Text className="text-gray-700 mb-4 leading-6">
            {mockReview.review.content}
          </Text>

          {/* Pros and Cons */}
          <View className="mb-4">
            <View className="mb-3">
              <Text className="font-bold text-gray-900 mb-2">Pros:</Text>
              {mockReview.review.pros.map((pro, index) => (
                <View key={index} className="flex-row items-start mb-1">
                  <Text className="text-green-500 mr-2">+</Text>
                  <Text className="text-gray-700 flex-1">{pro}</Text>
                </View>
              ))}
            </View>

            <View>
              <Text className="font-bold text-gray-900 mb-2">Cons:</Text>
              {mockReview.review.cons.map((con, index) => (
                <View key={index} className="flex-row items-start mb-1">
                  <Text className="text-red-500 mr-2">-</Text>
                  <Text className="text-gray-700 flex-1">{con}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Review Actions */}
          <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
            <View className="flex-row">
              <TouchableOpacity 
                className="flex-row items-center mr-6"
                onPress={handleLike}
              >
                <ThumbsUp 
                  size={20} 
                  color={liked ? '#4F46E5' : '#9CA3AF'} 
                  fill={liked ? '#4F46E5' : 'none'} 
                />
                <Text className={`text-sm ml-1 ${liked ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  {likesCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <MessageCircle size={20} color="#9CA3AF" />
                <Text className="text-gray-500 text-sm ml-1">{mockReview.review.comments}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <Share2 size={20} color="#9CA3AF" />
              <Text className="text-gray-500 text-sm ml-1">Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <Text className="font-bold text-gray-900 text-lg mb-3">Comments (5)</Text>
          
          {/* Comment Input */}
          <View className="flex-row mb-4">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' }}
              className="w-10 h-10 rounded-full"
            />
            <View className="flex-1 ml-3">
              <View className="bg-gray-100 rounded-lg px-4 py-3">
                <Text className="text-gray-500">Add a comment...</Text>
              </View>
            </View>
          </View>

          {/* Sample Comments */}
          <View className="mb-3">
            <View className="flex-row mb-3">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D' }}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-3 flex-1">
                <View className="bg-gray-50 rounded-lg p-3">
                  <Text className="font-bold text-gray-900 text-sm">Sarah Miller</Text>
                  <Text className="text-gray-700 text-sm mt-1">
                    I completely agree with your assessment. The collaborative environment is what makes Stanford stand out.
                  </Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <Text className="text-gray-500 text-xs">2 hours ago</Text>
                  <TouchableOpacity className="ml-3">
                    <Text className="text-indigo-600 text-xs">Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex-row ml-8 mb-3">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D' }}
                className="w-8 h-8 rounded-full"
              />
              <View className="ml-3 flex-1">
                <View className="bg-gray-50 rounded-lg p-3">
                  <Text className="font-bold text-gray-900 text-sm">Michael Chen</Text>
                  <Text className="text-gray-700 text-sm mt-1">
                    Would you recommend the AI specialization track specifically?
                  </Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <Text className="text-gray-500 text-xs">1 hour ago</Text>
                  <TouchableOpacity className="ml-3">
                    <Text className="text-indigo-600 text-xs">Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Related Reviews */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 text-lg font-bold">Related Reviews</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          
          {relatedReviews.map((review) => (
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
                    <Text className="text-gray-500 text-sm">{review.date}</Text>
                  </View>
                </View>
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