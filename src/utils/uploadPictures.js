import axios from "axios";

const uploadPictures = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

    const res = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL, form);
    return res.data.url;
  } catch (err) {
    return err;
  }
};

export default uploadPictures;