import { useState } from "react";
import { useSWRConfig } from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiPencilSquare } from "react-icons/hi2";
import { fetcher, uploadProfilePic } from "@/lib/lib";
import DeleteModal from "./deleteModal";

type UserProps = {
  id: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  department: string;
};

export default function UserProfileCard({
  id,
  imageUrl,
  firstName,
  lastName,
  department,
}: UserProps) {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [dept, setDept] = useState("");
  const [err, setErr] = useState("");
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const [editingFName, setEditingFName] = useState(false);
  const [editingLName, setEditingLName] = useState(false);
  const [editingDept, setEditingDept] = useState(false);

  async function deleteAccount() {
    await fetcher("auth/delete-user", { id });
    await fetcher("auth/logout");
    router.push("/");
  }

  async function uploadImage(e: any) {
    e.preventDefault();
    setErr("");
    const formData = new FormData();

    if (e.target[0]?.files[0]) {
      formData.append("file", e.target[0]?.files[0]);
      await uploadProfilePic(formData);
      mutate("auth/get-user");
      cancel();
    } else {
      setErr("No file chosen");
    }
  }

  async function postNewFName() {
    setErr("");
    if (!fName) {
      setErr("First Name required to update");
      return;
    }
    await fetcher("auth/edit-f-name", { newFName: fName });
    mutate("auth/get-user");
    cancel();
  }

  async function postNewLName() {
    setErr("");
    if (!lName) {
      setErr("Last Name required to update");
      return;
    }
    await fetcher("auth/edit-l-name", { newLName: lName });
    await mutate("auth/get-user");
    cancel();
  }

  async function postNewDept() {
    setErr("");
    if (!dept) {
      setErr("Department required to update");
      return;
    }
    await fetcher("auth/edit-dept", { newDept: dept });
    await mutate("auth/get-user");
    cancel();
  }

  function editFName() {
    setEditingFName(true);
    setEditingLName(false);
    setEditingDept(false);
  }

  function editLName() {
    setEditingLName(true);
    setEditingFName(false);
    setEditingDept(false);
  }

  function editDept() {
    setEditingDept(true);
    setEditingFName(false);
    setEditingLName(false);
  }

  function cancel() {
    setEditingFName(false);
    setEditingLName(false);
    setEditingDept(false);
    setErr("");
    reset();
  }

  function reset() {
    setFName("");
    setLName("");
    setDept("");
  }

  return (
    <div className="card w-108 bg-base-100 shadow-xl pb-4">
      <figure>
        <Image
          src={imageUrl}
          alt="Server photo"
          width={600}
          height={600}
          className="rounded-lg shadow-2xl w-full"
        />
      </figure>
      <form
        className="p-3 flex justify-center items-center gap-1"
        onSubmit={uploadImage}
      >
        <p className="font-bold">Change Image:</p>
        <input
          type="file"
          className="file-input file-input-bordered file-input-success max-w-xs"
          name="Image"
        />
        <input
          type="submit"
          value="Upload"
          className="p-1 rounded-lg border border-black font-semibold cursor-pointer"
        />
      </form>
      <div className="flex flex-col gap-2 p-3">
        <div className="flex gap-4 items-center">
          <p>First Name:</p>
          {editingFName ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="New first name"
                className="input w-40 h-7 border border-black"
                onChange={(e) => setFName(e.target.value)}
              />
              <button
                className="p-1 bg-green-400 text-black rounded-lg"
                onClick={postNewFName}
              >
                Edit
              </button>
              <button
                className="p-1 bg-red-400 text-white rounded-lg"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-10">
              <p>{firstName}</p>
              <HiPencilSquare
                className="w-6 h-6 cursor-pointer"
                onClick={editFName}
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <p>Last Name:</p>
          {editingLName ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="New last name"
                className="input w-40 h-7 border border-black"
                onChange={(e) => setLName(e.target.value)}
              />
              <button
                className="p-1 bg-green-400 text-black rounded-lg"
                onClick={postNewLName}
              >
                Edit
              </button>
              <button
                className="p-1 bg-red-400 text-white rounded-lg"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-10">
              <p>{lastName}</p>
              <HiPencilSquare
                className="w-6 h-6 cursor-pointer"
                onClick={editLName}
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <p>Department:</p>
          {editingDept ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="New last name"
                className="input w-40 h-7 border border-black"
                onChange={(e) => setDept(e.target.value)}
              />
              <button
                className="p-1 bg-green-400 text-black rounded-lg"
                onClick={postNewDept}
              >
                Edit
              </button>
              <button
                className="p-1 bg-red-400 text-white rounded-lg"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-10">
              <p>{department}</p>
              <HiPencilSquare
                className="w-6 h-6 cursor-pointer"
                onClick={editDept}
              />
            </div>
          )}
        </div>
      </div>
      {err && <p className="text-red-500 text-center">{err}</p>}
      <div className="mt-7">
        <label
          htmlFor="my-modal-delete-account"
          className="btn btn-error w-full"
        >
          Delete Account
        </label>
        <DeleteModal
          deleteAction={deleteAccount}
          name="delete your account?"
          id="delete-account"
          purpose="Delete Account"
        />
      </div>
    </div>
  );
}
