import { PrefectureCheckList } from "./prefecutre-check-list";
import { useHomePage } from "./hooks";
import { PopulationChart } from "./population-chart";

export function HomePage() {
  const {
    prefectures,
    checkedPrefCodes,
    populationCompositions,
    handleCheckedPrefectureChange,
  } = useHomePage();
  return (
    <div style={{ height: "50vh", width: "50%" }}>
      <PrefectureCheckList
        prefectures={prefectures}
        checkedPrefCodes={checkedPrefCodes}
        onCheckChange={handleCheckedPrefectureChange}
      />
      <PopulationChart population={populationCompositions} />
    </div>
  );
}
