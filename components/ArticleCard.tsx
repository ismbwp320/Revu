// components/ArticleCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  imageUrl: string;
  tags: string[];
  date: string;
  title: string;
  description: string;
  author: string;
  likes: number;
  views: number;
};

const ArticleCard: React.FC<Props> = ({
  imageUrl,
  tags,
  date,
  title,
  description,
  author,
  likes,
  views,
}) => {
  return (
    <View style={styles.card}>
      {/* Image */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Tags & Date */}
      <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <View
            key={index}
            style={[
              styles.tag,
              { backgroundColor: tag === "Featured" ? "#FFD60A" : "#4CAF50" },
            ]}
          >
            <Text
              style={[
                styles.tagText,
                { color: tag === "Featured" ? "#000" : "#fff" },
              ]}
            >
              {tag}
            </Text>
          </View>
        ))}

        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.authorRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {author.charAt(0).toLowerCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.role}>admin</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="heart-outline" size={16} color="#6B7280" />
            <Text style={styles.statText}>{likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={16} color="#6B7280" />
            <Text style={styles.statText}>{views}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 160,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 8,
  },
  tag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  dateText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#6B7280",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 12,
    marginTop: 6,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    marginHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    fontWeight: "600",
    textTransform: "lowercase",
  },
  author: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  role: {
    fontSize: 12,
    color: "#6B7280",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
});
