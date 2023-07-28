import { FormEvent,  useEffect, useState } from "react";
import { storage, upload_post_image } from "../../lib/firebase/cloud_storage";
import { FoodPostType } from "../../lib/schema";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { COLLECTIONS, database } from "../../lib/firebase/firestore";
import { useParams } from "react-router-dom";
import ImageFromStorageRef from "../../lib/components/ImageFromStorageRef";
import { StorageReference, deleteObject, ref } from "firebase/storage";
import ErrorSwal from "../../lib/components/alert/ErrorSwal";
import ConfirmSwal from "../../lib/components/alert/ConfirmSwal";

export default function EditPost() {
  const [thumb_uploading, set_thumb_uploading] = useState(false);
  const [old_post_data, set_old_post_data] = useState<FoodPostType>();
  const page_params = useParams();

  useEffect(() => {
    if (!old_post_data) {
      const docRef = doc(database, COLLECTIONS.FOOD_POST, (page_params.post_id as string) || "");
      getDoc(docRef).then((res) => {
        set_old_post_data(res.data() as FoodPostType);
      });
      null;
    }
  }, [old_post_data, page_params.post_id]);

  async function handle_submit(e: FormEvent) {
    e.preventDefault();
    let uploaded_file: StorageReference | null = null;
    const form_data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement).entries());

    try {
      if (!old_post_data?.thumbnail) {
        const file = form_data["thumbnail"] as Blob;
        const file_name = `${self.crypto.randomUUID()}-${file.name.replace(/_|\s/, "_")}`;
        set_thumb_uploading(true);
        uploaded_file = await upload_post_image(file_name, file);
      }
      set_thumb_uploading(false);

      const post_data = {
        description: form_data.description as string,
        thumbnail: old_post_data?.thumbnail || uploaded_file?.fullPath || "",
        title: form_data.title as string,
      };

      // const added_doc = await addDoc(collection(database, COLLECTIONS.FOOD_POST), post_data);
      // const ref = doc(collection(database,COLLECTIONS.FOOD_POST))
      // const added_doc = await setDoc(ref, post_data)
      await updateDoc(doc(database, COLLECTIONS.FOOD_POST, page_params.post_id as string), post_data);
      alert("successfully Updated");
    } catch (e) {
      ErrorSwal("error happend while updating");
    }
  }

  async function handle_removing_thumbnail(full_path: string) {
    const img_ref = ref(storage, full_path);

    if ((await ConfirmSwal("Are you Sure to delete ?")).isDenied) return;

    deleteObject(img_ref)
      .then(() => {
        set_old_post_data((prev) => {
          return {
            ...prev,
            thumbnail: "",
          } as FoodPostType;
        });
        updateDoc(doc(database, COLLECTIONS.FOOD_POST, page_params.post_id as string), {
          thumbnail: "",
        });
      })
      .catch((e) => ErrorSwal(e.message));
  }

  return (
    <div className="w-100">
      <form action="" className="col-lg-8 mx-auto" onSubmit={handle_submit}>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          {old_post_data?.thumbnail !== "" ? (
            <div className="">
              <ImageFromStorageRef className="d-block rounded" full_path={old_post_data?.thumbnail as string} style={{ maxWidth: 300 }} />
              <button className="btn btn-sm btn-danger mt-4" onClick={() =>old_post_data?.thumbnail && handle_removing_thumbnail(old_post_data.thumbnail)}>
                Remove
              </button>
            </div>
          ) : (
            <input type="file" required name="thumbnail" className="form-control" id="thumbnail" placeholder="name@example.com" />
          )}
          {thumb_uploading && <small className="text-primary">file uploading ...</small>}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" defaultValue={old_post_data?.title} required name="title" className="form-control" id="title" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea required className="form-control" defaultValue={old_post_data?.description} name="description" id="description" rows={7}></textarea>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-success px-4">
            Post a Food Help
          </button>
        </div>
      </form>
    </div>
  );
}
