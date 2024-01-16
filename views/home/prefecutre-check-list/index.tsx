import { PrefectureSchemaType } from "@/entities/resas";
import style from "./styles.module.css";
import { useMemo } from "react";

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
  const rand = useMemo(() => crypto.getRandomValues(new Uint8Array(1)), []);
  return (
    <div className={style.container}>
      {prefectures?.map(({ prefName, prefCode }) => (
        <label
          className={style.checkbox_group}
          htmlFor={`${rand}${prefCode}`}
          key={prefCode}
        >
          <input
            type="checkbox"
            id={`${rand}${prefCode}`}
            name={`${prefCode}`}
            checked={checkedPrefCodes.includes(prefCode)}
            onChange={(e) => onCheckChange(prefCode, e.target.checked)}
          />
          {prefName}
        </label>
      ))}
    </div>
  );
};
