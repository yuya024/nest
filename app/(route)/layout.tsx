import Toolbar from "@/components/menu/toolbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toolbar />
    </>
  );
}
