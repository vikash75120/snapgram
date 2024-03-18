import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/initialApp";

const uploadImage = (file,setImageUrlState=()=>{})=>{
   let imageUrl;
      const uploadFile = () => {
         const name = file.name;
         // console.log(name);
         const storageRef = ref(storage, name);

         const uploadTask = uploadBytesResumable(storageRef, file);
         uploadTask.on(
            "state_changed",
            (snapshot) => {
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               // console.log("Upload is " + progress + "% done");
               switch (snapshot.state) {
                  case "paused":
                     // console.log("Upload is paused");
                     break;
                  case "running":
                     // console.log("Upload is running");
                     break;
                     default:
                     break;
               }
            },
            (error) => {},
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                 setImageUrlState(downloadURL);
               });
            }
         );
      };
      file && uploadFile();
}

export default uploadImage;