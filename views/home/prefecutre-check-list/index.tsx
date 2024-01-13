import { PrefectureSchemaType } from "@/entities/resas";
import style from "./styles.module.css";

type Props = {
  prefectures?: PrefectureSchemaType[];
  checkedPrefCodes: number[];
  onCheckChange: (prefCode: number, isChecked: boolean) => void;
};

export const PrefectureCheckList = ({
  prefectures,
  checkedPrefCodes,
  onCheckChange,
}: Props) => {
  const rand = crypto.getRandomValues(new Uint8Array(1));
  return (
    <form className={style.container}>
      {prefectures?.map(({ prefName, prefCode }) => (
        <div key={prefCode}>
          <input
            type="checkbox"
            id={`${rand}${prefCode}`}
            name={`${prefCode}`}
            checked={checkedPrefCodes.includes(prefCode)}
            onChange={(e) => onCheckChange(prefCode, e.target.checked)}
          />
          <label htmlFor={`${rand}${prefCode}`}>{prefName}</label>
        </div>
      ))}
    </form>
  );
};
