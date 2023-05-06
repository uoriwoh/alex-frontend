import Image from "next/image";
import { useSWRConfig } from "swr";
import { HiOutlineTrash } from "react-icons/hi2";
import WarningModal from "./warningModal";
import { fetcher } from "@/lib/lib";

export default function UserCard({
  imageUrl,
  name,
  email,
  department,
  role,
  id,
}: {
  imageUrl: string;
  name: string;
  email: string;
  department: string;
  role: string;
  id: string;
}) {
  const { mutate } = useSWRConfig();
  async function deleteUser(id: string) {
    await fetcher("auth/delete-user", { id });
    mutate("auth/all-users");
  }
  return (
    <div className="py-6">
      {role === "User" && (
        <div className="card bg-base-100 shadow-xl relative w-80">
          <figure>
            <Image
              src={imageUrl}
              alt="Server photo"
              width={600}
              height={600}
              className="rounded-lg shadow-2xl w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <div>
              <p>Email Address: {email}</p>
              <p>Department: {department}</p>
            </div>
            <div className="card-actions justify-end">
              <div>
                <label
                  htmlFor={`my-modal-User${id}`}
                  className="btn btn-error absolute bottom-0 right-1"
                >
                  <HiOutlineTrash className="w-6 h-6" />
                </label>
                <WarningModal
                  action={() => deleteUser(id)}
                  name="User"
                  id={id}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
