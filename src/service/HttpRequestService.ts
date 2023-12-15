import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";
import { AxiosInterceptor } from "./interceptors/axios.interceptors";

AxiosInterceptor();

const url = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const axiosInstance = axios.create() //used to prevent the interceptor from intercepting the request "uploadPostImage"

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
    const res = await axios.post(`${url}/post`, data, {});
    if (res.status === 201) {
      return res.data;
    }
  },
  createComment: async (data: PostData) => {
    const res = await axios.post(`${url}/comment/${data.parentId}`, {
      content: data.content,
      images: data.images,
    });
    if (res.status === 201) {
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await axios.get(`${url}/post/${query}`, {
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
    const res = await axios.get(`${url}/post/${query}`, {
      params: {
        limit: query[0],
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await axios.get(`${url}/user/`, {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  doesFollow: async (id: string) => {
    const res = await axios.get(`${url}/follower/follow/${id}`, {});
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    const res = await axios.get(`${url}/user/me`, {});
    if (res.status === 200) {
      return res.data;
    }
  },
  getPostById: async (id: string) => {
    const res = await axios.get(`${url}/post/${id}`, {});
    if (res.status === 200) {
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: string) => {
    const res = await axios.post(
      `${url}/reaction/${postId}`,
      {},
      {
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
      params: {
        type: reaction,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await axios.post(`${url}/follower/follow/${userId}`, {});
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await axios.post(`${url}/follower/unfollow/${userId}`, {});
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axios.get(`${url}/user/by_username/${username}`, {
        params: {
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
    const res = await axios.get(`${url}/user/${id}`, {});
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
    const res = await axios.get(`${url}/post/by_user/${id}`, {});

    if (res.status === 200) {
      return res.data;
    }
  },
  isLogged: async () => {
    const res = await axios.get(`${url}/user/me`, {});
    return res.status === 200;
  },
  getProfileView: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {});

    if (res.status === 200) {
      return res.data;
    }
  },
  deleteProfile: async () => {
    const res = await axios.delete(`${url}/user/me`, {});

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },
  getContacts: async () => {
    const res = await axios.get(`${url}/message/chat`, {});

    if (res.status === 200) {
      return res.data;
    }
  },
  getMutualFollows: async () => {
    const res = await axios.get(`${url}/follower/mutual/`, {});

    if (res.status === 200) {
      return res.data;
    }
  },
  createChat: async (id: string) => {
    const res = await axios.post(`${url}/chat`, {
      users: [id],
    });

    if (res.status === 201) {
      return res.data;
    }
  },
  getChat: async (id: string) => {
    const res = await axios.get(`${url}/message/chat/${id}`, {});

    if (res.status === 200) {
      return res.data;
    }
  },
  deletePost: async (id: string) => {
    await axios.delete(`${url}/post/${id}`, {});
  },
  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axios.get(`${url}/comment/${id}`, {
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
    const res = await axios.get(`${url}/comment/${id}`, {});
    if (res.status === 200) {
      return res.data;
    }
  },
  uploadPostImage: async (file: File) => {
    const res = await axios.get(`${url}/post/image/presignedUrl`, {
      params: {
        filetype: file.type,
      },
    });
    if (res.status === 200) {
      const presignedUrl = res.data.presignedUrl;
      const imageUrl = res.data.fileUrl;

      try {
        const uploadResponse = await axiosInstance.put(presignedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        if (uploadResponse.status === 200) {
          return imageUrl;
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
};

const useHttpRequestService = () => httpRequestService;

export { useHttpRequestService };
