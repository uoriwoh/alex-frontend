import UserCard from "@/components/userCard";
import { useAllUsers } from "@/lib/hooks";
export default function AllUsers() {
  const { data } = useAllUsers();

  return (
    <div className=" hero bg-base-200 flex flex-wrap items-center justify-center gap-3">
      {data?.message?.map((item: any) => (
        <UserCard
          key={item.id}
          name={`${item.firstName} ${item.lastName}`}
          imageUrl={item.imageUrl}
          email={item.email}
          department={item.department}
          role={item.role}
          id={item.id}
        />
      ))}
    </div>
  );
}
