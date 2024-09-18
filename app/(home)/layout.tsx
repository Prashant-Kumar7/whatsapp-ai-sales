import { Appbar } from "@/components/ui/Appbar";
import { Menu } from "@/components/ui/Menu";
import { SidebarItem } from "@/components/ui/sidebarContent";

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element {
    return (
      <div className="flex w-screen h-screen flex-col">
        <div className="sticky top-0 z-500">
          <Appbar/>
        </div>
        <div className="flex bg-slate-900 min-h-[715px]">
            <Menu/>
          {children}
        </div>
      </div>
    );
  }


  function UploadIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}