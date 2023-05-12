import NavBar from "./navbar";

type AppWrapperProps = {
  children: React.ReactNode;
};

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
