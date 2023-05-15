import NewsCard from "@/components/newCard";
import { useAllPosts } from "@/lib/hooks";

export default function Index() {
  const { data } = useAllPosts();

  return (
    <main className="relative flex justify-center hero bg-base-200">
      {data?.statusCode === 200 && (
        <div className="mt-10">
          {data.message
            .map((item: any) => (
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
            ))
            .reverse()}
        </div>
      )}
    </main>
  );
}
