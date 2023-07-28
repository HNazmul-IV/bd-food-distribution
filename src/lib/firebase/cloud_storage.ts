import { StorageReference, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebase_app } from "./app";

export const storage = getStorage(firebase_app);

export async function upload_post_image(name: string, file_date: Blob): Promise<StorageReference> {
  const post_storage_ref = ref(storage, `post/${name}`);

  return uploadBytes(post_storage_ref, file_date).then(async (snapshot) => {
    // const url = await getDownloadURL(snapshot.ref);
    // return url;
    return snapshot.ref;
  });
}

// export function getUrlFromRef(ref: StorageReference):Promise<> {
//   return getDownloadURL(ref).then((value) => {
//     return value;
//   });
// }
