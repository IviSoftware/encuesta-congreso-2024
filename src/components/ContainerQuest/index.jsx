import { TitleQuest } from "../TitleQuests";
import { ProgressBar } from "../ProgressBar";
import { NavbarQuest } from "../NavBarQuest";

function ContainerQuest({ children, percentageState, title }) {
  return (
    <div>
      <NavbarQuest />
      <div className="w-full min-h-screen h-auto flex justify-center items-center bg-slate-300">
        <div
          style={{ maxWidth: "500px", fontSize: "" }}
          className="bg-white w-full rounded-md p-8 relative bottom-12 md:bottom-24"
        >
          <TitleQuest title={title} />
          <ProgressBar percentage={percentageState} />
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export { ContainerQuest };
