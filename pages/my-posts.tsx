import AddPostButton from "@/components/addPostButton";
import NewsCard from "@/components/newCard";
import AddNewsModal from "@/components/addPostModal";
import { usePosts } from "@/lib/hooks";

export default function MyPosts() {
  const { data } = usePosts();
  return (
    <div className="relative flex justify-center hero bg-base-200">
      {data?.statusCode === 200 && (
        <div className="mt-10">
          {data.message.length !== 0 ? (
            data.message
              .map((item: any) => (
                <NewsCard
                  key={item.id}
                  postId={item.id}
                  title={item.title}
                  content={item.content}
                  imageUrl={item.imageUrl}
                  userID={item.authorId}
                />
              ))
              .reverse()
          ) : (
            <div>
              <p>You have no posts to display</p>
            </div>
          )}

          <AddPostButton />
          <AddNewsModal />
        </div>
      )}
    </div>
  );
}
