import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ImagePreview = (props) => {
  return (
    <div className="mx-auto grid grid-cols-4">
      {/* container for image */}
      <div className="bg-gray-200 p-2 rounded-lg mt-3 col-start-2 col-span-2">
        <img
          className="object-contain rounded-md"
          src={URL.createObjectURL(props.file)}
          alt="placeholder"
        />
      </div>

      {/* 'X' button for removing attached image */}
      <div
        className="col-start-4 place-self-center ml-3 py-2 px-3 rounded-lg text-xl hover:bg-red-200"
        onClick={props.handleDelete}
      >
        <FontAwesomeIcon icon={faTimesCircle} className="text-red-400">
          <p className="sr-only">Click to remove uploaded image.</p>
        </FontAwesomeIcon>
      </div>
    </div>
  );
};

export default ImagePreview;
