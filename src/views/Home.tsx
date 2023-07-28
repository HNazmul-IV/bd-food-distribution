import { QueryDocumentSnapshot, collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { COLLECTIONS, database } from "../lib/firebase/firestore";
import NewsFeedPostCard from "../lib/components/NewsFeedPostCard";

export default function Home() {
  const [posts, set_posts] = useState<QueryDocumentSnapshot[]>([]);

  useEffect(() => {
    if (posts.length == 0) {
      const q = query(collection(database, COLLECTIONS.FOOD_POST), limit(25));
      getDocs(q).then((querySnapShot) => set_posts(querySnapShot.docs));
    }
  }, [posts]);

  return (
    <div className="border mx-auto my-5" style={{ width: 700 }}>
      <div className="bg-light text-center py-3 mb-5">
        <h1>Hi, Welcome</h1>
        <p>This Platform is to help foodless people. please don't misbehave this.</p>
      </div>

      <div className=" col-8 mx-auto">
        {posts.map((item) => {
          return <NewsFeedPostCard data={item} />;
        })}
      </div>
    </div>
  );
}
