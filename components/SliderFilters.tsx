
import { VStack } from "./ui/vstack";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Check, Filter, Globe, MapPin, School, Star } from "lucide-react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatesByCountry } from "@/constants/States";

async function fetchSchools() {
  const res = await fetch("https://app.ed-cred.com/school");
  return res.json();
}

const Sidebar = () => {
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [showAllSchools, setShowAllSchools] = useState(false);


  // const navigation = useNavigation();


  const toggleSchool = (school: string) => {
    setSelectedSchools((prev) =>
      prev.includes(school) ? prev.filter((s) => s !== school) : [...prev, school]
    );
  };


  const router = useRouter();

  // const applyFilters = () => {
  //   // Collect filters
  //   const filters = {
  //     rating: selectedRating,
  //     schools: selectedSchools.join(","), // convert array to CSV
  //     country,
  //     state,
  //   };

  //   console.log("filters: ", filters);
    
  //   // Push to Feed with filters in query params
  //   router.push({
  //     pathname: "/feed",
  //     params: filters,
  //   });
  // };

  const applyFilters = () => {
  const filters: Record<string, string> = {};

  if (selectedRating) {
    filters.rating = selectedRating.toString();
  }

  if (selectedSchools.length > 0) {
    filters.schools = selectedSchools.join(",");
  }

  if (country && country.trim() !== "") {
    filters.country = country;
  }

  if (state && state.trim() !== "") {
    filters.state = state;
  }

  console.log("filters: ", filters);

  router.push({
    pathname: "/feed",
    params: filters,
  });
};




  const resetFilters = () => {
    setSelectedRating(null);
    setSelectedSchools([]);
    setCountry("");
    setState("");
    applyFilters();
  };

  const { data: schoolsData, error, isLoading } = useQuery({
    queryKey: ["schools"],
    queryFn: fetchSchools,
  });

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading data, {JSON.stringify(error)}</Text>;

  return (
    <ScrollView className="w-full" scrollEnabled={scrollEnabled}>
      <VStack space="xl" className="py-6 px-4">

        {/* Header */}
        <View className="flex-row items-center mb-2">
          <Filter size={20} className="text-blue-600" />
          <Text className="ml-2 text-lg font-bold text-gray-900">Filter Reviews</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Filter by Rating */}
          <View className="flex-row items-center mb-4">
            <Star size={20} className="text-green-500 mr-2" />
            <Text className="text-sm font-medium text-gray-700">
              Filter by Rating
            </Text>
          </View>

          <View className="flex-row mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setSelectedRating(star)}
                className={`p-2 mx-1 rounded-md border ${selectedRating === star ? "bg-green-100 border-green-500" : "border-gray-300"
                  }`}
              >
                <Text className="text-lg">{star} 🍏</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* School Section */}
          <View>
            <View className="flex-row items-center mb-2 ">
              <School className="text-blue-600 mr-2" size={20} />
              <Text className="text-sm font-medium text-gray-700">School</Text>
            </View>
            <ScrollView
              scrollEnabled={showAllSchools}
              style={{ maxHeight: showAllSchools ? 162 : "auto" }} // 👈 Limit height for scroll
              nestedScrollEnabled={true} // 👈 allows smooth scroll inside other scrolls
            >
              {(showAllSchools ? schoolsData : schoolsData.slice(0, 3)).map((school: any) => (
                <Pressable
                  key={school.id}
                  onPress={() => toggleSchool(school.name)}
                  className="flex-row items-center p-3 mb-2 border rounded-lg border-gray-300"
                >
                  <View
                    className={`w-5 h-5 mr-3 rounded border flex justify-center items-center ${selectedSchools.includes(school.name)
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400"
                      }`}
                  >
                    {selectedSchools.includes(school.name) && (
                      <Check className="text-white" size={14} />
                    )}
                  </View>
                  <Text className="text-gray-800">{school.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
            {schoolsData.length > 3 && (
              <TouchableOpacity
                onPress={() => setShowAllSchools(!showAllSchools)}
                className="p-3 mb-4 rounded-lg bg-gray-100"
              >
                <Text className="text-blue-600 text-center font-medium">
                  {showAllSchools ? "Show less" : "Show all Schools"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Country */}
          <View className="flex-row items-center mb-4">
            <Globe size={20} className="text-green-500 mr-2" />
            <Text className="text-sm font-medium text-gray-700">Country</Text>
          </View>

          <View className="border border-gray-300 rounded-lg mb-4 mb-6 bg-gray-100 py-2 px-2">
            <Picker
              selectedValue={country}
              onValueChange={(val) => {
                setCountry(val);
                setState(""); // reset state when country changes
              }}
              className="bg-gray-100 focus:outline-none"
            >
              <Picker.Item label="Select country" value="" />
              {Object.keys(StatesByCountry).map((countryName) => (
                <Picker.Item
                  key={countryName}
                  label={countryName}
                  value={countryName}
                />
              ))}
            </Picker>
          </View>

          {/* State */}
          <View className="flex-row items-center mb-4">
            <MapPin size={20} className="text-red-500 mr-2" />
            <Text className="text-sm font-medium text-gray-700">State</Text>
          </View>
          <View className={`border border-gray-300 rounded-lg mb-6 bg-gray-100 py-2 px-2 ${country ? 'bg-gray-100' : 'bg-gray-400'}`}>
            <Picker
              enabled={!!country}
              selectedValue={state}
              onValueChange={(val) => setState(val)}
              className={`bg-gray-100 focus:outline-none ${country ? 'bg-gray-100' : 'bg-gray-400'}`}
            >
              <Picker.Item label="Select state" value="" />
              {country && StatesByCountry[country]?.map((stateName) => (
                <Picker.Item
                  key={stateName}
                  label={stateName}
                  value={stateName}
                />
              ))}
            </Picker>

          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={resetFilters}
            className="flex-1 mr-2 py-3 rounded-lg bg-gray-200"
          >
            <Text className="text-center text-gray-700 font-medium">Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => console.log("Filters Applied")}
            onPress={applyFilters}
            className="flex-1 ml-2 py-3 rounded-lg bg-green-600"
          >
            <Text className="text-center text-white font-medium">
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </VStack>
    </ScrollView>
  );
};
export default Sidebar;

