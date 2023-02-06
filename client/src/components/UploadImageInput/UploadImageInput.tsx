import React from "react";
import useDatabseRequest from "../../apiHooks/useDatabseRequest";

const UploadImageInput: React.FC<{ onChange: (imagePath: string) => void }> = ({
  onChange,
}) => {
  const { handleChangeUserImage } = useDatabseRequest();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files && e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    handleChangeUserImage(formData).then((data) => {
      onChange(data.data.image);
    });
  };

  return (
    <input
      onChange={handleImageChange}
      placeholder="upload file"
      type="file"
    ></input>
  );
};

export default UploadImageInput;
