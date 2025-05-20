import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import { PageHead } from "@/components/PageHead/PageHead";
import { SiteLayout } from "@/layouts/SiteLayout/SiteLayout";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import Image from "next/image";

export default function HomePage() {
  const { data: user } = trpc.useQuery(["user.me"]);

  return (
    <SiteLayout>
      <PageHead title="Home" />

      <div className="h-32" />

      <section id="home" className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold">Peace of mind is here.</h1>

          <h2 className="text-2xl text-black-2 dark:text-white-2">
            Control your budgets, spending and personal finances.
            <span className="font-semibold text-primary"> Better.</span>
          </h2>

          <div className="relative flex gap-12 mt-8">
            {user ? (
              <>
                <Button.Link
                  href={pages.dashboard}
                  color="monochrome"
                  endIcon={<Avatar name={user.name} image={user.image} />}
                >
                  Continue as {user.name?.split(/\s/)[0]}
                </Button.Link>
              </>
            ) : (
              <>
                <Button.Link
                  href={pages.login}
                  color="monochrome"
                  className="scale-125 origin-top-left"
                >
                  Get started for free
                </Button.Link>
                <Button.Link
                  href={pages.login}
                  variant="text"
                  color="monochrome"
                  className="scale-125 origin-top-left"
                >
                  Login
                </Button.Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 w-full relative" style={{ height: 600 }}>
          <Image src={"/assets/svg/ui-example.svg"} alt="" fill />
        </div>
      </section>
    </SiteLayout>
  );
}
