export default function UploadFile() {
  async function imageAction(e: any) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target[0].files[0]);

    const data = await fetch("http://localhost:3333/post/upload", {
      method: "post",
      body: formData,
    });

    const message = await data.json();

    console.log(message);
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
