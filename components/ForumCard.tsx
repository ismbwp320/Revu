import { AnimatePresence, Motion } from "@legendapp/motion";
// import { Image } from "expo-image";
import { ChevronRight, Heart } from "lucide-react-native";
import React from "react";
import { ViewProps } from "react-native";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Icon, StarIcon } from "./ui/icon";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { Tooltip, TooltipContent, TooltipText } from "./ui/tooltip";
import { VStack } from "./ui/vstack";

const MotionView = Motion.View as React.ComponentType<ViewProps & any>;

interface ForumCardProps {
  forum: {
    name: string;
    src?: any;
    likes: number;
    views: number;
    replies: number;
    category?: string | null;
    author?: string;
    tags?: string[];
    rating?: number;
    location?: string;
    price?: string;
  };
  isLiked: boolean;
  onToggleLike: () => void;
}

export const ForumCard: React.FC<ForumCardProps> = ({ forum, isLiked, onToggleLike }) => {
  return (
    <Box className="flex-1 my-2 lg:my-0 lg:mr-0 lg:ml-0">
      <Pressable className="w-full">
        {(props: any) => (
          <>
            <Box className="overflow-hidden rounded-md h-72">
              {/* <Image
                source={forum.src}
                className={`w-full h-72 ${
                  props.hovered ? "scale-[1.04] opacity-90" : "scale-100 opacity-100"
                }`}
                alt="Explore"
              /> */}
            </Box>

            {props.hovered && (
              <Box className="absolute bg-[#181718] opacity-30 w-full h-full cursor-pointer" />
            )}

            <Box
              className={`absolute top-[45%] bg-transparent rounded border border-white self-center content-center py-1.5 px-4 flex-row ${
                props.hovered ? "flex" : "hidden"
              }`}
            >
              <Text className="text-white">Explore</Text>
              <Icon as={ChevronRight} size="sm" className="self-center" color="white" />
            </Box>
          </>
        )}
      </Pressable>

      {/* Like Button */}
      <Pressable
        onPress={onToggleLike}
        className="absolute top-3 right-4 h-6 w-6 justify-center items-center"
      >
        <AnimatePresence>
          <MotionView
            key={isLiked ? "liked" : "unliked"}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: "spring", mass: 0.9, damping: 9, stiffness: 300 }}
            style={{ position: "absolute" }}
          >
            <Icon
              as={Heart}
              size="lg"
              className={isLiked ? "fill-red-500 stroke-red-500" : "fill-gray-500 stroke-white"}
            />
          </MotionView>
        </AnimatePresence>
      </Pressable>

      {/* Card Details */}
      <HStack className="justify-between py-2 items-start">
        <VStack space="sm" className="flex-1">
          <Text className="font-semibold text-typography-900">{forum.name}</Text>
          {forum.location && <Text size="sm" className="text-typography-500">{forum.location}</Text>}

          {forum.price && (
            <HStack>
              <Text size="sm" className="font-semibold text-typography-900">{forum.price}</Text>
              <Text size="sm" className="pl-1 text-typography-900">night</Text>
            </HStack>
          )}
        </VStack>

        {forum.rating && (
          <Tooltip trigger={(triggerProps: any) => (
            <Pressable {...triggerProps}>
              <HStack className="items-center flex-start">
                <Icon as={StarIcon} size="2xs" className="stroke-typography-900 fill-typography-900" />
                <Text size="sm" className="pl-1 text-typography-900">{forum.rating}</Text>
              </HStack>
            </Pressable>
          )}>
            <TooltipContent>
              <TooltipText className="text-white px-2 py-1">Ratings</TooltipText>
            </TooltipContent>
          </Tooltip>
        )}
      </HStack>
    </Box>
  );
};
