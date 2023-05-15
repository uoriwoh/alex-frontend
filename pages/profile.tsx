import UserProfileCard from "@/components/userProfileCard";
import { useUser } from "@/lib/hooks";

export default function Profile() {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return <p className="flex justify-center items-center">Loading...</p>;
  } else {
    return (
      <div className="flex justify-center">
        <UserProfileCard
          id={data?.message.id}
          imageUrl={data?.message.imageUrl}
          firstName={data?.message.firstName}
          lastName={data?.message.lastName}
          department={data?.message.department}
        />
      </div>
    );
  }
}
