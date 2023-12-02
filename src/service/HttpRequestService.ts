import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";

const url =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  createPost: async (data: PostData) => {
    const res = await axios.post(`${url}/post`, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 201) {
      return res.data;
    }
  },
  createComment: async (data: PostData) => {
    const res = await axios.post(
      `${url}/comment/${data.parentId}`,
      {content: data.content, images: data.images},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await axios.get(`${url}/post/${query}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPosts: async (query: string) => {
    const res = await axios.get(`${url}/post/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit: query[0],
      }
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await axios.get(`${url}/user`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    const res = await axios.get(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPostById: async (id: string) => {
    const res = await axios.get(`${url}/post/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: string) => {
    const res = await axios.post(
      `${url}/reaction/${postId}`, {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          type: reaction,
        },
      }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  deleteReaction: async (postId: string, reaction: string) => {
    const res = await axios.delete(`${url}/reaction/${postId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        type: reaction,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await axios.post(
      `${url}/follower/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await axios.post(`${url}/follower/unfollow/${userId}`, {}, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axios.get(`${url}/user/search`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          username,
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  isLogged: async () => {
    const res = await axios.get(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await axios.delete(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },

  getChats: async () => {
    const res = await axios.get(`${url}/chat`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  getMutualFollows: async () => {
    const res = await axios.get(`${url}/follow/mutual`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (id: string) => {
    const res = await axios.post(
      `${url}/chat`,
      {
        users: [id],
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await axios.get(`${url}/chat/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await axios.delete(`${url}/post/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },

  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axios.get(`${url}/comment/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getCommentsByPostId: async (id: string) => {
    const res = await axios.get(`${url}/comment/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  uploadPostImage: async (file: File) => {
    const res = await axios.get(`${url}/post/image/presignedUrl`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        filetype: file.type,
      },
    });
    if (res.status === 200) {
      const presignedUrl = res.data.presignedUrl;
      const imageUrl = res.data.fileUrl;
      axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      }).then((res) => {
        console.log("image upload to s3 " + res.status);
        console.log(imageUrl)
        return imageUrl;
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
class HttpService {
  service = httpRequestService;
}

export { useHttpRequestService, HttpService };
