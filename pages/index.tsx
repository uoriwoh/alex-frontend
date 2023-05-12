import NewsCard from "@/components/newCard";
import { useAllPosts, useUser } from "@/lib/hooks";
import AddPostButton from "@/components/addPostButton";
import AddNewsModal from "@/components/addPostModal";

export default function Home() {
  const { data } = useAllPosts();
  const { data: user } = useUser();

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

          {user?.message?.userId && (
            <div>
              <AddPostButton />
              <AddNewsModal />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
