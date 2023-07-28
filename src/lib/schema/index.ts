import { EmptyProfile } from "./profile";

export { EmptyFoodPostSchema } from "./Post";
export { EmptyProfile } from "./profile";
export type FoodPostType = {
  title: string;
  description: string;
  like: string[];
  dislike: string[];
  owner: string;
  created_at: string;

  requests: {
    requested_time: string;
    status: "accepted" | "pending" | "rejected";
    user_id: string;
  }[];
  thumbnail: string;
};
export type ProfileType = typeof EmptyProfile;
