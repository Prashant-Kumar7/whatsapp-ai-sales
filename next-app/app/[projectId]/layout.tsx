"use client";
import { Appbar } from "@/components/ui/Appbar";
import { Menu } from "@/components/ui/Menu";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathName = usePathname();
  const projectId = pathName.split("/")[1];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Appbar />
      </div>
      <div className="flex flex-1 bg-white">
        <div className="sticky top-[64px] h-[calc(100vh-64px)] shadow-2xl">
          <Menu projectId={projectId} />
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
