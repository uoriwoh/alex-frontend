export default function AddPostButton() {
  return (
    <div className="fixed bottom-20 md:right-20 right-7 z-10">
      <label
        htmlFor="my-modal"
        className="rounded-full bg-blue-700 text-white p-3 md:p-7 font-bold cursor-pointer"
      >
        Post+
      </label>
    </div>
  );
}
