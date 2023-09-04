import { baseurl, token } from "@/lib/lib";
export default function UploadFile() {
  async function imageAction(e: any) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target[0].files[0]);

    const data = await fetch(`${baseurl}post/upload`, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await data.json();
  }
  return (
    <div className="content">
      <form onSubmit={imageAction}>
        <input type="file" name="image" />
        <button type="submit" name="upload">
          Upload
        </button>
      </form>
    </div>
  );
}
