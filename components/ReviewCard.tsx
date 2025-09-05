import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Image } from './ui/image';
import { Text } from './ui/text';
import { MapPin, MessageCircle, School, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { showDate } from '@/lib/utils';

const ReviewCard = ({ review }: any) => {

    const isDistrict = review?.category?.name?.toLowerCase().includes("district");
    const isSchool =
        review?.category?.name?.toLowerCase().includes("school") &&
        !review?.category?.name?.toLowerCase().includes("staff");
    let totalRating = 0;
    let count = 0;

    review?.responses?.forEach((res: any) => {
        if (res?.avgRating) {
            totalRating += Number(res?.avgRating);
            count++;
        }
    });
    const averageRating =
        count > 0 ? Number((totalRating / count).toFixed(2)) : 0;
    const date = showDate(review?.createdAt);
    const period =
        review?.responses &&
        review?.responses?.find(
            (key: Record<string, any>) => key?.details?.reportingPeriod
        );

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
        <View key={review.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row mb-3 ">
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D" }}
                    className="border-muteted bg-white rounded-md p-4 "
                    alt={review?.category?.name}
                />
              {/* <View className="border-muteted border-2 bg-white rounded-md p-4 sm:block hidden">
                <Image source={`${review?.category?.iconUrl}.svg`} size={40} />
              </View> */}
                <View className="ml-3 flex-1">
                    
                    <Text className={`text-xs rounded-full  px-2 border-[1px] border-solid yellow w-fit mb-1`}>{review?.category?.name}</Text>

                    <View  className="flex-row justify-between">
                    <Text className="font-bold text-gray-900">
                        {!isDistrict && !isSchool
                            ? review?.name
                            : review?.branch?.name}
                    </Text>
                    <Text className='text-gray-500 text-sm'>{date}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="flex-row items-center">
                            <MapPin size={12} color="#9CA3AF" />
                            <Text className="text-gray-500 text-sm ml-1">{review?.branch?.country}
                                {review?.branch?.state ? ", " + review?.branch?.state : ""}</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center">
                        <School size={12} color="#9CA3AF" />
                        <Text className="text-gray-500 text-sm ml-1">{isDistrict && isSchool ? review?.name : review?.branch?.name}</Text>
                    </View>
                </View>
            </View>
           

            <View className="flex-row items-center mb-2">
                {renderStars(averageRating)}
                <Text className="text-gray-600 font-semibold ml-2">{averageRating.toFixed(1)}{" "}
              ({review?.responses?.length} review
              {review?.responses?.length > 1 ? "s" : ""})</Text>
                {/* <Text className="text-gray-500 text-sm ml-2"> {date}</Text> */}
            </View>
              <Text className="font-semibold text-gray-700">
                {review?.responses[0]?.feedbackForm?.title}
            </Text>

            <Text className="text-gray-700 mb-3 text-sm whitespace-normal line-clamp-3"> {review?.responses &&
                review?.responses.find(
                  (key: Record<string, any>) => key?.comments
                )?.comments}</Text>

            <View className="flex-row items-center justify-between">
                <View className="flex-row">
                    <TouchableOpacity className="flex-row items-center">
                        <MessageCircle size={16} color="#9CA3AF" />
                        <Text className="text-gray-500 text-sm ml-1">found helpful</Text>
                        {/* <Text className="text-gray-500 text-sm ml-1">{review.comments}</Text> */}
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
    )
}

export default ReviewCard