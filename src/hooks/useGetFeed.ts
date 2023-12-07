import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useGetFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [canLoad, setCanLoad] = useState(true);
  const posts = useAppSelector((state) => state.user.feed);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  const loadMore = async () => {
    if (loading || !canLoad) return;

    setLoading(true);
    setError(false);

    try {
      const lastPostId = posts[posts.length - 1]?.id || '';
      const newPosts = await service.getPaginatedPosts(5, lastPostId, '');

      if (newPosts.length === 0) {
        setCanLoad(false);
      } else {
        const updatedPosts = [...posts, ...newPosts];
        dispatch(updateFeed(updatedPosts));
        dispatch(setLength(updatedPosts.length));
      }
    } catch (e) {
      setError(true);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return { posts, loading, error, loadMore, canLoad };
};
