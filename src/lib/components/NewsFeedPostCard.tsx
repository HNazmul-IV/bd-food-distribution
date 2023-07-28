import { useContext, useEffect, useState } from "react";
import ImageFromStorageRef from "./ImageFromStorageRef";
import { DocumentReference, QueryDocumentSnapshot, arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FoodPostType } from "../schema";
import { UserContextData } from "../context/UserContext";
import { COLLECTIONS, database } from "../firebase/firestore";

interface PropsTypes {
  data: QueryDocumentSnapshot;
}

export default function NewsFeedPostCard(props: PropsTypes) {
  const [data, set_data] = useState(props.data.data() as FoodPostType);
  const { user } = useContext(UserContextData);
  const docRef: DocumentReference = doc(database, COLLECTIONS.FOOD_POST, props.data.id);
  const [exist_request, set_exist_request] = useState<FoodPostType["requests"][0] | undefined>();

  useEffect(() => {
    if (data?.requests?.length > 0) {
     const f=  data.requests.find((v) => v.user_id === user?.uid);
     set_exist_request(f);
    }
    console.log(data.requests);
  }, [data.requests, user?.uid]);

  //Make like;
  async function dis_like() {
    if (!user) return;
    if (data.like.includes(user?.uid)) {
      //Removing Like and Adding Dislike;
      await updateDoc(docRef, {
        like: arrayRemove(user?.uid),
        dislike: arrayUnion(user.uid),
      });

      set_data((prev) => ({ ...prev, like: data.like.filter((id) => id !== user.uid), dislike: [...data.dislike, user.uid] }));
    } else if (data.dislike.includes(user.uid)) {
      await updateDoc(docRef, {
        dislike: arrayRemove(user.uid),
      });
      set_data((prev) => ({ ...prev, dislike: data.dislike.filter((id) => id !== user.uid) }));
    } else {
      await updateDoc(docRef, {
        dislike: arrayUnion(user.uid),
      });
      set_data((prev) => ({ ...prev, dislike: [...data.dislike, user.uid] }));
    }
  }

  //Make dislike
  async function like() {
    if (!user) return;
    if (data.dislike.includes(user?.uid)) {
      await updateDoc(docRef, {
        dislike: arrayRemove(user?.uid),
        like: arrayUnion(user.uid),
      });

      set_data((prev) => ({ ...prev, dislike: data.dislike.filter((id) => id !== user.uid), like: [...data.like, user.uid] }));
    } else if (data.like.includes(user.uid)) {
      await updateDoc(docRef, {
        like: arrayRemove(user.uid),
      });
      set_data((prev) => ({ ...prev, like: data.like.filter((id) => id !== user.uid) }));
    } else {
      await updateDoc(docRef, {
        like: arrayUnion(user.uid),
      });
      set_data((prev) => ({ ...prev, like: [...data.like, user.uid] }));
    }
  }

  async function handle_toggle_request(should: "send" | "cancel") {
    if (!user) return;
    const request_obj: FoodPostType["requests"][0] = {
      requested_time: Date.now().toString(),
      status: "pending",
      user_id: user.uid,
    };

    if (should === "send") {
      await updateDoc(docRef, {
        requests: arrayUnion(request_obj),
      });
      set_exist_request(request_obj);
    } else if (should === "cancel") {
      await updateDoc(docRef, {
        request_obj: arrayRemove(exist_request),
      });
      set_exist_request(undefined);
    }
  }

  return (
    <div>
      <div className="card mb-3 feed-post-card">
        <div className="card-header">
          <h4 className="mb-0 mt-2">{data.title}</h4>
          <small className="mb-0 small text-muted">posted by: unknown</small>
        </div>
        <div className="card-body">
          <p className="card-text">{data.description}</p>
        </div>
        <ImageFromStorageRef className="card-img rounded-0" full_path={data.thumbnail} />
        <div className="card-footer p-0 position-relative">
          {!user?.email && (
            <div className="position-absolute d-flex justify-content-center align-items-center card-action-lock w-100 h-100 top-0 start-0">
              <p className="mb-0">Please Login to Make Request</p>
            </div>
          )}
          <div className="d-flex p-2 justify-content-between">
            <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button type="button" onClick={() => like()} className={` btn  ${data.like.includes(user?.uid as string) ? "btn-dark" : "btn-outline-dark"} `}>
                Like ({data.like.length})
              </button>
              <button type="button" className={` btn  ${data.dislike.includes(user?.uid as string) ? "btn-danger" : "btn-outline-danger"} `} onClick={() => dis_like()}>
                Dislike ({data.dislike.length})
              </button>
            </div>

            {data.owner !== user?.uid && (
              <div className="">
                {exist_request?.requested_time ? (
                  <button onClick={() => handle_toggle_request("cancel")} className="btn btn-danger btn-sm">
                    Cancel Request
                  </button>
                ) : (
                  <button onClick={() => handle_toggle_request("send")} className="btn btn-info btn-sm">
                    Send Request
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
