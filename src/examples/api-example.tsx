import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useLogin, useProfile, useLogout } from "../hooks/api/useAuth";
import {
  useApiGet,
  useApiPost,
  useInvalidateQueries,
} from "../hooks/api/useApi";
import { User, Post, CreatePostRequest } from "../api/types";

// Example: Login Component
export const LoginExample: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({ email, password });
      Alert.alert("Success", "Logged in successfully!");
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Example: Profile Component
export const ProfileExample: React.FC = () => {
  const profileQuery = useProfile();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      Alert.alert("Error", "Logout failed.");
    }
  };

  if (profileQuery.isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (profileQuery.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Error loading profile: {profileQuery.error.message}
        </Text>
      </View>
    );
  }

  const user = profileQuery.data?.data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {user && (
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name: {user.name}</Text>
          <Text style={styles.label}>Email: {user.email}</Text>
          <Text style={styles.label}>
            Member since: {new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
        disabled={logoutMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Example: Posts List Component
export const PostsExample: React.FC = () => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const postsQuery = useApiGet<Post[]>("/posts");
  const createPostMutation = useApiPost<Post, CreatePostRequest>("/posts");
  const { invalidateByKey } = useInvalidateQueries();

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        title: newPostTitle,
        content: newPostContent,
      });

      // Clear form
      setNewPostTitle("");
      setNewPostContent("");

      // Refresh posts list
      invalidateByKey(["/posts"]);

      Alert.alert("Success", "Post created successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>

      {/* Create Post Form */}
      <View style={styles.form}>
        <Text style={styles.subtitle}>Create New Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Post title"
          value={newPostTitle}
          onChangeText={setNewPostTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Post content"
          value={newPostContent}
          onChangeText={setNewPostContent}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreatePost}
          disabled={createPostMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {createPostMutation.isPending ? "Creating..." : "Create Post"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <View style={styles.postsList}>
        <Text style={styles.subtitle}>All Posts</Text>

        {postsQuery.isLoading && <Text>Loading posts...</Text>}

        {postsQuery.error && (
          <Text style={styles.error}>Error: {postsQuery.error.message}</Text>
        )}

        {postsQuery.data?.data.map((post) => (
          <View key={post.id} style={styles.postItem}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <Text style={styles.postMeta}>
              By {post.author.name} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Example: Error Boundary Component
export const ErrorBoundaryExample: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  profileInfo: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: "#FF3B30",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  postsList: {
    flex: 1,
  },
  postItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  postMeta: {
    fontSize: 12,
    color: "#666",
  },
});
