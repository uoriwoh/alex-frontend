import { useState } from "react";
import { useSWRConfig } from "swr";
import { HiOutlineTrash } from "react-icons/hi2";
import { useComments, useUser } from "@/lib/hooks";
import Image from "next/image";
import CollapseContent from "./collapseContent";
import WarningModal from "./warningModal";
import { fetcher } from "@/lib/lib";
export default function NewsCard({
  title,
  content,
  imageUrl,
  postId,
  userID,
  firstName,
  lastName,
}: {
  title: string;
  content: string;
  imageUrl: string;
  postId: number;
  userID: string;
  firstName: string;
  lastName: string;
}) {
  const [show, setShow] = useState(false);
  const { data } = useComments();
  const { data: user } = useUser();
  const { mutate } = useSWRConfig();

  const filtered = data?.message?.filter((item: any) => item.postId === postId);

  async function deleteComment(id: number) {
    await fetcher("post/delete-comment", { id });
    mutate("post/get-comments");
  }

  async function deletePost(id: number) {
    await fetcher("post/delete-post", { id });
    mutate("post/get-user-posts");
    mutate("post/all-posts");
  }

  const check = user?.message?.id === userID || user?.message?.role === "Admin";

  return (
    <div className="card bg-base-100 shadow-xl mb-7 relative">
      {check && (
        <div>
          <label
            htmlFor={`my-modal-Post${postId}`}
            className="btn btn-error absolute right-0"
          >
            <HiOutlineTrash className="w-6 h-6" />
          </label>
          <WarningModal
            action={() => deletePost(postId)}
            name="Post"
            id={postId}
          />
        </div>
      )}

      {imageUrl && (
        <figure>
          <Image
            src={imageUrl}
            alt="Server photo"
            width={600}
            height={600}
            className="rounded-lg shadow-2xl w-full"
          />
        </figure>
      )}
      <div className="pl-7 pt-3 flex gap-2">
        <p className="font-bold">Created by: </p>
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className="card-body flex flex-col items-center w-200">
        <h2 className="card-title">{title}</h2>
        <div className="">
          {show || (
            <div>
              {content.split("@@").join("\n").split(" ").slice(0, 20).join(" ")}
              ...{" "}
              <span
                className="text-blue-700 cursor-pointer hover:text-blue-300"
                onClick={() => setShow(true)}
              >
                Read more
              </span>
            </div>
          )}
          {show && (
            <div className="flex flex-col gap-2">
              {content.split("@@").map((item, i) => (
                <p key={i} className="flex justify-center">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Add a line here */}
        <div className="w-full border-1"></div>
        {/* <div className="divider w-full"></div> */}
        <div className="flex flex-start">
          <CollapseContent postId={postId}>
            {filtered?.length !== 0 ? (
              filtered
                ?.map((item: any) => (
                  <div className="flex items-center gap-20" key={item.id}>
                    <div className="flex gap-4 items-center">
                      <div className="avatar">
                        <div className="w-8">
                          <Image
                            src={item.author.imageUrl}
                            alt="Server photo"
                            width={450}
                            height={500}
                            className="rounded-lg shadow-2xl"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-bold">
                          {item.author.firstName} {item.author.lastName}
                        </p>
                        <p>{item.content}</p>
                      </div>
                    </div>
                    {user?.message?.id === item.author.id ||
                    user?.message?.role === "Admin" ? (
                      <label
                        htmlFor={`my-modal-Comment${item.id}`}
                        className="btn"
                      >
                        <HiOutlineTrash />
                      </label>
                    ) : (
                      <div></div>
                    )}
                    <WarningModal
                      action={() => deleteComment(item.id)}
                      id={item.id}
                      name="Comment"
                    />
                  </div>
                ))
                .reverse()
            ) : (
              <div>No comments on this post yet</div>
            )}
          </CollapseContent>
        </div>
      </div>
    </div>
  );
}
/* 
To do: 
1. create an admin that can delete any post, any user, and any comment
2. Users should have a separate profile page to add image or edit name
*/
