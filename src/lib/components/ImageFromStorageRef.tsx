import {  getDownloadURL, ref } from "firebase/storage";
import { CSSProperties, useEffect, useState } from "react";
import { storage } from "../firebase/cloud_storage";

interface PropsTypes {
  full_path: string;
  className: string;
  style?:CSSProperties
}

export default function ImageFromStorageRef(props: PropsTypes) {
  const [src, set_src] = useState("");

  useEffect(() => {
    if (!src && props.full_path) {
      getDownloadURL(ref(storage,props.full_path)).then((value) => set_src(value.toString()));
    }
  });

  useEffect(() => {
    console.log(src);
  }, [src]);

  return <img src={src} className={ props.className } alt="" style={props.style}/>;
}
