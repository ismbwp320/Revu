import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TrendingUp } from "lucide-react-native";

type Props = {
  tags: string[];
  category: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  date: string;
  author: string;
};

const DiscussionCard: React.FC<Props> = ({
  tags,
  category,
  title,
  description,
  views,
  likes,
  comments,
  date,
  author,
}) => {
  return (
    <View style={styles.card}>
      {/* Tags */}
      <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <View
            key={index}
            style={[
              styles.tag,
              { backgroundColor: index === 0 ? "#D1FAE5" : "transparent" },
            ]}
          >
            <Text
              style={[
                styles.tagText,
                { color: index === 0 ? "#059669" : "#374151" },
              ]}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* Category */}
      <Text style={styles.category}>{category}</Text>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="eye-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>{views}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="trending-up" size={16} color="#6B7280" />
          <Text style={styles.statText}>{likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>{comments}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>{date}</Text>
        </View>
      </View>

      {/* Author */}
      <View style={styles.authorRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{author.charAt(0).toLowerCase()}{author.charAt(1).toLowerCase()}</Text>
        </View>
        
        <Text style={styles.author}>{author}</Text>
      </View>
    </View>
  );
};

export default DiscussionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 4,
    elevation: 2,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  category: {
    fontSize: 10,
    color: "black",
    fontWeight: '500',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 26,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "#6B7280",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // borderTopWidth: 1,
    // borderColor: "#E5E7EB",
    paddingTop: 10,
  },
   avatar: {
    backgroundColor: "#D1FAE5",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#10B981",
    fontWeight: "400",
    textTransform: "lowercase",
  },
  author: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666c7bff",
  },
});
