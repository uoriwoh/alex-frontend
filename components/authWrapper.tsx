import NextLink from "next/link";

type AuthType = {
  children: React.ReactNode;
  loading: boolean;
  header: string;
  title: string;
  query: string;
  queryLink: string;
  queryTitle: string;
  action: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function AuthWrapper({
  children,
  header,
  title,
  query,
  queryLink,
  queryTitle,
  loading,
  action,
}: AuthType) {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">{header}</h1>
            <p className="mt-2 text-gray-500">{title}</p>
          </div>
          <div className="mt-5">
            <form action="">
              {children}
              <div className="my-6">
                {loading && (
                  <button className="btn loading w-full rounded-md bg-black px-3 py-4 text-white h-14">
                    loading
                  </button>
                )}
                {loading || (
                  <button
                    type="submit"
                    className="w-full rounded-md bg-green-400 px-3 py-4 text-black font-bold h-14"
                    onClick={action}
                  >
                    {header}
                  </button>
                )}
              </div>
              <p className="text-center text-sm text-gray-500">
                {query}
                <NextLink
                  href={queryLink}
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  {" "}
                  {queryTitle}
                </NextLink>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
