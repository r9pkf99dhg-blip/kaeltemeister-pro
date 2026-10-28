import type { Dispatch, SetStateAction } from "react";
import type { AcademyProgress } from "../academy/model";
import MasteryHub from "./MasteryHub";
import MissionView from "./MissionView";
export default function MasteryPage(props: {
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  practice: (id: string) => void;
  openModule: (id: string) => void;
  openExam: () => void;
  openCycle: () => void;
}) {
  return (
    <MasteryHub
      progress={props.progress}
      setProgress={props.setProgress}
      practice={props.practice}
    >
      <MissionView {...props} />
    </MasteryHub>
  );
}
