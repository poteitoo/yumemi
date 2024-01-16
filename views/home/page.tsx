import { PrefectureCheckList } from "./prefecutre-check-list";
import { useHomePage } from "./hooks";
import { PopulationChart } from "./population-chart";
import { CategoryRadioList } from "./category-radio-list";
import style from "./styles.module.css";

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
    <div className={style.container}>
      <h1>人口構成チャート</h1>
      <h2>都道府県</h2>
      <PrefectureCheckList
        prefectures={prefectures}
        checkedPrefCodes={checkedPrefCodes}
        onCheckChange={handleCheckedPrefectureChange}
      />
      <h2>カテゴリー</h2>
      <CategoryRadioList
        category={checkedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <h2>チャート</h2>
      <PopulationChart
        population={populationCompositions}
        category={checkedCategory}
      />
    </div>
  );
}
