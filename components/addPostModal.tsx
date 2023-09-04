import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { upload } from "@/lib/lib";

export default function AddNewsModal() {
  const { mutate } = useSWRConfig();
  const [dataOk, setDataOk] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (title && content) {
      setDataOk(true);
    } else {
      setDataOk(false);
    }
  }, [title, content]);

  async function formAction(e: any) {
    e.preventDefault();
    const formData = new FormData();

    if (e.target[2]?.files[0]) {
      formData.append("file", e.target[2].files[0]);
      formData.append("title", title);
      formData.append("content", content.split("\n").join("@@"));
      await upload(formData);
      setContent("");
      setTitle("");
      mutate("post/get-user-posts");
      mutate("post/all-posts");
      return;
    }

    formData.append("title", title);
    formData.append("content", content.split("\n").join("@@"));

    await upload(formData);
    setContent("");
    setTitle("");
    mutate("post/get-user-posts");
    mutate("post/all-posts");
  }

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />

      <form className="modal" onSubmit={formAction}>
        <div className="modal-box flex flex-col gap-6">
          <div className="flex justify-center items-center gap-3 w-full">
            <p className="font-bold text-lg">Title of post:</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="py-4 font-bold text-lg">Content:</p>
            <textarea
              className="textarea textarea-accent w-full"
              placeholder="Content here"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="font-bold text-lg">Upload Image:</p>
            <input
              type="file"
              className="file-input file-input-bordered file-input-success w-full max-w-xs"
              name="Image"
            />
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-error">
              Cancel
            </label>
            <button type="submit">
              {dataOk ? (
                <label
                  htmlFor="my-modal"
                  className="btn bg-blue-500 text-white hover:bg-white hover:text-blue-500"
                >
                  Add Post
                </label>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
