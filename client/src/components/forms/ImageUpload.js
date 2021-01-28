import React from "react";
import ImagePreview from "./ImagePreview";

const ImageUpload = ({ file, handleUpload }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* hidden file input: users interact with the label instead */}
      <input
        className="opacity-0 h-1"
        type="file"
        name="file-input"
        id="file-input"
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      {/* label: contains upload button + displays file name */}
      <label
        className="flex items-center w-full mt-2"
        htmlFor="file-input"
      >
        {/* upload button */}
        <p className="btn-submit m-0 bg-blueBtn">
          Attach an image
        </p>

        {/* display name of attached file */}
        <p className="flex-grow p-2 mt-0 text-gray-500">{file?.name}</p>
      </label>

      {/* if an image is attached, display a preview + allow removal */}
      {file && (
        <ImagePreview file={file} handleDelete={() => handleUpload(null)} />
      )}
    </div>
  );
};

export default ImageUpload;
