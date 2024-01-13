import Link from "next/link";
import { PrefectureCheckList } from "./prefecutre-check-list";
import { useHomePage } from "./hooks";

export function HomePage() {
  const { prefectures, checkedPrefCodes, handleCheckedPrefectureChange } =
    useHomePage();
  return (
    <div>
      <PrefectureCheckList
        prefectures={prefectures}
        checkedPrefCodes={checkedPrefCodes}
        onCheckChange={handleCheckedPrefectureChange}
      />
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
