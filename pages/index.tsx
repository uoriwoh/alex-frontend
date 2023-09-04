import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

import NewsCard from "@/components/newCard";
import { fetchPosts } from "@/lib/lib";

export default function Index() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalNum, setTotalNum] = useState(0);
  const tracker = useRef(0);
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: data.length === totalNum ? true : false,
  });

  useEffect(() => {
    async function fetchData(num: number) {
      setIsLoading(true);
      const { data, totalNum } = await fetchPosts(num);
      setData(data);
      setTotalNum(totalNum);
      setIsLoading(false);
    }
    if (inView) {
      tracker.current = tracker.current + 2;
      fetchData(tracker.current);
    }
  }, [ref, inView]);

  return (
    <main className="index relative flex flex-col justify-center hero bg-base-200">
      <div className="mt-10">
        {data.map((item: any) => (
          <NewsCard
            key={item.id}
            postId={item.id}
            title={item.title}
            content={item.content}
            imageUrl={item.imageUrl}
            userID={item.authorId}
            firstName={item.author?.firstName}
            lastName={item.author?.lastName}
          />
        ))}
      </div>
      <div ref={ref}></div>
      {isLoading && <p>...Loading posts</p>}
      {data.length === totalNum && (
        <p className="text-center mb-3">Sorry. No more posts to fetch</p>
      )}
    </main>
  );
}
