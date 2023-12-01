import axios from "axios";

export const S3Service = {
  upload: async (file: File, url: string) => {
    const blob = new Blob([file], { type: "image/png" });

    await axios.put(url, blob);
  },
};
