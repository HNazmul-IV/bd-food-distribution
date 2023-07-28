import { FormEvent, useContext, useState } from "react";
import { upload_post_image } from "../../lib/firebase/cloud_storage";
import { FoodPostType } from "../../lib/schema";
import { UserContextData } from "../../lib/context/UserContext";
import { addDoc, collection } from "firebase/firestore";
import { COLLECTIONS, database } from "../../lib/firebase/firestore";

export default function CreatePost() {
  const [thumb_uploading, set_thumb_uploading] = useState(false);
  const { user } = useContext(UserContextData);

  async function handle_submit(e: FormEvent) {
    e.preventDefault();
    const form_data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement).entries());

    const file = form_data["thumbnail"] as Blob;
    const file_name = `${self.crypto.randomUUID()}-${file.name.replace(/_|\s/, "_")}`;
    set_thumb_uploading(true);
    const uploaded_file = await upload_post_image(file_name, file);

    console.log(uploaded_file);
    set_thumb_uploading(false);

    const post_data: FoodPostType = {
      created_at: Date.now().toString(),
      description: form_data.description as string,
      dislike:[],
      like:[],
      owner: user?.uid as string,
      requests: [],
      thumbnail: uploaded_file.fullPath,
      title: form_data.title as string,
    };

    const added_doc = await addDoc(collection(database, COLLECTIONS.FOOD_POST), post_data);
    // const ref = doc(collection(database,COLLECTIONS.FOOD_POST))
    // const added_doc = await setDoc(ref, post_data)
    console.log(added_doc);
  }

  return (
    <div className="w-100">
      <form action="" className="col-lg-8 mx-auto" onSubmit={handle_submit}>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          <input type="file" required name="thumbnail" className="form-control" id="thumbnail" placeholder="name@example.com" />
          {thumb_uploading && <small className="text-primary">file uploading ...</small>}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" required name="title" className="form-control" id="title" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea required className="form-control" name="description" id="description" rows={7}></textarea>
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
