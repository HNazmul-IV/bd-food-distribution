import { useContext, useEffect, useState } from "react";
import { FoodPostType } from "../../lib/schema";
import { QueryDocumentSnapshot, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { COLLECTIONS, database } from "../../lib/firebase/firestore";
import ImageFromStorageRef from "../../lib/components/ImageFromStorageRef";
import { ref } from "firebase/storage";
import { storage } from "../../lib/firebase/cloud_storage";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContextData } from "../../lib/context/UserContext";

const ReactSwal = withReactContent(Swal);

export default function PostList() {
  const [posts, set_posts] = useState<QueryDocumentSnapshot[]>([]);
  const { user } = useContext(UserContextData);

  useEffect(() => {
    const q = query(collection(database, COLLECTIONS.FOOD_POST), where("owner", "==", user?.uid));
    getDocs(q).then((res) => {
      set_posts(res.docs);
    });
  }, []);

  async function handle_delete(id: string, title: string) {
    const docRef = doc(database, COLLECTIONS.FOOD_POST, id);
    const { isConfirmed } = await Swal.fire({
      title: "Confirmation",
      html: `YOur sure to delete ${title}`,
      showDenyButton: true,
    });

    if (isConfirmed) {
      deleteDoc(docRef).then(() => Swal.fire("Successfully Deleted", "", "success"));
    }
  }

  function handle_showing(_data: FoodPostType) {
    ReactSwal.fire({
      title: _data.title,
      html: (
        <div>
          <ImageFromStorageRef className="w-100 mb-4" full_path={_data.thumbnail} />
          <p>{_data.description}</p>
        </div>
      ),
      heightAuto: true,
    });
  }

  return (
    <div className="row w-100">
      {posts.map((item) => {
        const data = item.data() as FoodPostType;
        console.log(ref(storage, data.thumbnail));

        return (
          <div className="col-lg-4 py-2">
            <div className="card h-100">
              {/* <img src={data.thumbnail} className="card-img-top" alt="..." /> */}
              <ImageFromStorageRef style={{ aspectRatio: "3/2", objectFit: "cover" }} className="card-img-top" full_path={data.thumbnail} />
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description.substring(0, 70)}...</p>
              </div>
              <div className="card-footer d-flex justify-content-around">
                <button onClick={() => handle_showing(data)} className="btn btn-sm btn-primary">
                  view{" "}
                </button>

                <Link to={`/dashboard/edit-post/${item.id}`} className="btn btn-sm btn-info">
                  Edit
                </Link>
                <button onClick={() => handle_delete(item.id, data.title)} className="btn btn-sm btn-danger">
                  Delete{" "}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
