//Image Upload Component for FORM.
import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();
  useEffect(() => {
    if(!File){
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () =>{
        setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(File);
  },[File])
  //Handles Picked Image.
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if( event.target.files && event.target.files.length === 1 ){
        pickedFile = event.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;
    }
    else{
        setIsValid(false);
        fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid)
  };
  //Handles Image Uploading.
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-control ${props.center && "center"}`}>
        <div className="image-control__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          UPLOAD IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
