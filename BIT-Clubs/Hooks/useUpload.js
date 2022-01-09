import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

// const storage = getStorage();

// function useUpload(path, file) {
//     const storageRef = ref(storage, `${path}/` + 'lolo');
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//     (snapshot) => {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//         case 'paused':
//             console.log('Upload is paused');
//             break;
//         case 'running':
//             console.log('Upload is running');
//             break;
//         }
//     }, 
//     (error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//         case 'storage/unauthorized':
//             // User doesn't have permission to access the object
//             break;
//         case 'storage/canceled':
//             // User canceled the upload
//             break;

//         // ...

//         case 'storage/unknown':
//             // Unknown error occurred, inspect error.serverResponse
//             break;
//         }
//     }, 
//     () => {
//         // Upload completed successfully, now we can get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log('File available at', downloadURL);
//         return downloadURL;
//         });
//     }
//     );
// }

// export {useUpload}


async function useUpload(uri, path) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(getStorage(), 'images/'+`${path}`);
    const result = await uploadBytes(fileRef, blob);
  
    // We're done with the blob, close and release it
    // blob.close();
  
    return await getDownloadURL(fileRef);
  }

  export {useUpload}