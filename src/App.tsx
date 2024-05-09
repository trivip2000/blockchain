// import React from "react";
import useSWR from "swr";

interface User {
  name: string;
}

const Home = () => {
  const fetcher = async (url: RequestInfo, init?: RequestInit) =>
    fetch(url, init).then((res) => res.json()) as Promise<User[]>;
  const { data, error, isLoading } = useSWR<User[]>("http://localhost:3001", fetcher);

  if (error) return <div>Failed to fetch users.</div>;
  if (isLoading) return <h2>Loading...</h2>;
  if (!data) return null;
  return (
    <>
      <div>
        {data.map((user: User, index: number) => {
          return <h2 key={index}>{user.name}</h2>;
        })}
      </div>
    </>
  );
};

export default Home;