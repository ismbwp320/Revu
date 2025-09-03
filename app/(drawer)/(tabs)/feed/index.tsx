import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { Search, Filter, Users, ArrowDown01, ArrowDown10 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ReviewCard from '@/components/ReviewCard';
import MobileSidebarActionsheet from '@/components/MobileSidebarActionsheet';

const { width } = Dimensions.get('window');

const categories = [
  { "id": null, "name": "All" },
  { "id": 6, "name": "Principal" },
  { "id": 5, "name": "School Staff Member" },
  { "id": 4, "name": "School" },
  { "id": 3, "name": "Teacher" },
  { "id": 2, "name": "District/Organization" },
  { "id": 1, "name": "Leadership Member" }
]

// async function fetchPosts(categoryId?: any) {
//   const url = categoryId
//     ? `https://app.ed-cred.com/school/employees?categoryId=${categoryId}`
//     : `https://app.ed-cred.com/school/employees`;

//   const res = await fetch(url);
//   return res.json();
// }

  async function fetchPosts(filters: {
  rating?: string;
  schools?: string;
  country?: string;
  state?: string;
  categoryId?: string;
}) {
  const baseUrl = "https://app.ed-cred.com/school/employees";

  const params = new URLSearchParams();

  if (filters.country) params.append("country", filters.country);
  if (filters.state) params.append("state", filters.state);
  if (filters.schools) params.append("school", filters.schools); // backend expects `school`
  if (filters.rating) params.append("rating", filters.rating);
  if (filters.categoryId) params.append("categoryId", filters.categoryId);

  const url = `${baseUrl}?${params.toString()}`;

  console.log("Fetching:", url);

  const res = await fetch(url);
  return res.json();
}
// async function fetchPosts(filters: {
//   rating?: string | null;
//   schools?: string | string[] | null;
//   country?: string | null;
//   state?: string | null;
//   categoryId?: string | null;
// }) {
//   const baseUrl = "https://app.ed-cred.com/school/employees";
//   const params = new URLSearchParams();

//   if (filters.country && filters.country.trim() !== "") {
//     params.append("country", filters.country);
//   }

//   if (filters.state && filters.state.trim() !== "") {
//     params.append("state", filters.state);
//   }

//   if (filters.schools) {
//     if (Array.isArray(filters.schools)) {
//       filters.schools.forEach((school) => {
//         if (school.trim() !== "") params.append("school", school);
//       });
//     } else if (filters.schools.trim() !== "") {
//       params.append("school", filters.schools);
//     }
//   }

//   if (filters.rating && filters.rating.trim() !== "") {
//     params.append("rating", filters.rating);
//   }

//   if (filters.categoryId && filters.categoryId.trim() !== "") {
//     params.append("categoryId", filters.categoryId);
//   }

//   const url =
//     params.toString().length > 0 ? `${baseUrl}?${params.toString()}` : baseUrl;

//   console.log("Fetching:", url);

//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }


export default function Feed() {
  const router = useRouter();
  // const { id } = useLocalSearchParams();
  const glob = useGlobalSearchParams();
  // const params = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
    // const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const [actionsheetVisible, setActionsheetVisible] = React.useState(false);


  const params = useLocalSearchParams<{
    rating?: string;
    schools?: string;
    country?: string;
    state?: string;
    categoryId?: string;
  }>();

  const { rating, schools, country, state, categoryId } = params;

  const { data: reviews, error, isLoading } = useQuery({
    queryKey: ["posts", { rating, schools, country, state, categoryId }],
    queryFn: () =>
      fetchPosts({ rating, schools, country, state, categoryId }),
  });

  const handleClick = (category: any) => {
    setActiveFilter(category.name.toLowerCase());
    // Copy existing params
    const newParams = { ...params };

    // Update categoryId (remove if undefined)
    if (category.id) {
      newParams.categoryId = category.id.toString();
    } else {
      delete newParams.categoryId;
    }

    // Push new URL with updated query
    router.push({
      pathname: "/feed",
      params: newParams,
    });
  };

  // const { data: reviews, error, isLoading } = useQuery({
  //   queryKey: ["posts", params.categoryId],
  //   queryFn: () => fetchPosts(params.categoryId),
  // });

  const employees = reviews?.employees ?? [];

  // Apply sorting
  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortOrder) return 0; // no sorting
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    return 0;
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

          {/* <ArrowDown01 color="#6B7280" size={20} className='mr-2' /> */}
          <TouchableOpacity onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} >
            {
              sortOrder === "asc" ? (
                <ArrowDown01 color={sortOrder === "asc" ? "#4F46E5" : "#6B7280"} size={20} className="mr-2" />
              ) : (
                <ArrowDown10  color={sortOrder === "desc" ? "#4F46E5" : "#6B7280"} size={20} className="mr-2" />
              )
            }
          </TouchableOpacity>

          <TouchableOpacity>
            <Filter
              size={20}
              color="#6B7280"
              onPress={() => {  setActionsheetVisible(true);
                // router.push('./filter');

              }}
            />
          </TouchableOpacity>
        </View>
           <MobileSidebarActionsheet
        actionsheetVisible={actionsheetVisible}
        setActionsheetVisible={setActionsheetVisible}
      />

        {/* Quick Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-24">
          <View className="flex-row justify-between mb-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`px-4 mx-2 py-2 rounded-full ${activeFilter === category.name.toLowerCase()
                  ? 'bg-white'
                  : 'bg-white/20'
                  }`}
                // onPress={() => setActiveFilter(filter.toLowerCase())}
                onPress={() => handleClick(category)}
              >
                <Text
                  className={
                    activeFilter === category.name.toLowerCase()
                      ? 'text-indigo-600 font-medium'
                      : 'text-white font-medium'
                  }
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>

        {/* Recent Reviews */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 text-lg font-bold">Recent Reviews</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          {/* {JSON.stringify(review)} */}
          {
            sortedEmployees.map((review: any) => (
              <ReviewCard review={review} />
            ))
          }

        </View>
      </ScrollView>
    </View>
  );
}

