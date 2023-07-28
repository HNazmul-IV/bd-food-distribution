import { getFirestore } from "firebase/firestore";
import { firebase_app } from "./app";

export const database = getFirestore(firebase_app);

export const COLLECTIONS = {
  PROFILE: "profile",
  FOOD_POST: "food-post",
};

