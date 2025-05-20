import { useBreakpoint } from "@/hooks/useBreakpoint";
import { AppLayoutHeader } from "./components/AppLayoutHeader/AppLayoutHeader";
import { RoundedMobileCorners } from "./components/RoundedMobileCorners/RoundedMobileCorners";
import { BottomTabs } from "./features/BottomTabs/BottomTabs";
import { Sidebar } from "./features/Sidebar/Sidebar";

export type AppLayoutProps = {
  children?: React.ReactNode;
  active?: "dashboard" | "analytics" | "schedules" | "settings" | "budgets";
};

export const AppLayout = Object.assign(
  function AppLayout(props: AppLayoutProps) {
    const isDesktop = useBreakpoint("desktop");

    if (isDesktop === true) {
      return (
        <div className="h-screen w-full flex overflow-hidden dark:bg-black-bg-2">
          <aside>
            <Sidebar active={props.active} />
          </aside>
          <main className="w-full overflow-y-auto">{props.children}</main>
        </div>
      );
    } else if (isDesktop === false) {
      return (
        <div className="flex flex-col h-max-screenMinusTabs">
          <RoundedMobileCorners />

          <main className="fixed bottom-tabs left-0 right-0 top-0 dark:bg-black-bg-2 overflow-y-auto overflow-x-hidden">
            {props.children}
          </main>
          <nav className="fixed bottom-0 left-0 right-0 h-tabs">
            <BottomTabs active={props.active} />
          </nav>
        </div>
      );
    }

    return null;
  },
  {
    Header: AppLayoutHeader,
  }
);
