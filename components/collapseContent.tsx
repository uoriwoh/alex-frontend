import { useState } from "react";
import { useSWRConfig } from "swr";
import { fetcher } from "@/lib/lib";
import { useUser } from "@/lib/hooks";
import { HiChatBubbleLeft } from "react-icons/hi2";

export default function CollapseContent({
  postId,
  children,
}: {
  postId: number;
  children: React.ReactNode;
}) {
  const [content, setContent] = useState("");
  const { mutate } = useSWRConfig();
  const { data } = useUser();

  async function action() {
    if (!content) {
      return;
    }
    await fetcher("post/post-comment", { content, postId });
    mutate("post/get-comments");
  }

  return (
    <div className="collapse">
      <input type="checkbox" />
      <div className="collapse-title w-200">
        <HiChatBubbleLeft className="w-6 h-6" />
      </div>
      <div className="collapse-content w-full">
        {data?.message?.userId && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add comment"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn" onClick={action}>
              Add
            </button>
          </div>
        )}
        <div className="flex flex-col gap-2 mt-5">{children}</div>
      </div>
    </div>
  );
}
