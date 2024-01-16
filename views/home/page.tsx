import { PrefectureCheckList } from "./prefecutre-check-list";
import { useHomePage } from "./hooks";
import { PopulationChart } from "./population-chart";
import { CategoryRadioList } from "./category-radio-list";

export function HomePage() {
  const {
    checkedCategory,
    prefectures,
    checkedPrefCodes,
    populationCompositions,
    handleCheckedPrefectureChange,
    handleCategoryChange,
  } = useHomePage();

  return (
    <div style={{ height: "50vh", width: "50%" }}>
      <PrefectureCheckList
        prefectures={prefectures}
        checkedPrefCodes={checkedPrefCodes}
        onCheckChange={handleCheckedPrefectureChange}
      />
      <CategoryRadioList
        category={checkedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <PopulationChart
        population={populationCompositions}
        category={checkedCategory}
      />
    </div>
  );
}
