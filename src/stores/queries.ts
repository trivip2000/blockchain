import { useQuery } from "react-query";
import { Post } from "./interfaces"; // Assuming Post interface exists

// Type for query results (array of Post)
type PostsQueryResult = Post[];

// Type for query results (single Post)
type PostQueryResult = Post;

const getPosts = async (): Promise<PostsQueryResult> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

const getPost = async (id: number): Promise<PostQueryResult> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
};

export const useGetPosts = () =>
  useQuery<PostsQueryResult, Error>("posts", getPosts);

export const useGetPost = (postId: number) =>
  useQuery<PostQueryResult, Error>(["post", postId], () => getPost(postId), {
    keepPreviousData: true,
  });
