import {
  COMPOSITION_EN_TO_JP_LABELS,
  CompositionEnToJpLabelKeys,
} from "@/entities/resas";
import style from "./styles.module.css";
import { useMemo } from "react";

type Props = {
  category: CompositionEnToJpLabelKeys;
  onCategoryChange: (category: CompositionEnToJpLabelKeys) => void;
};

export const CategoryRadioList = ({ category, onCategoryChange }: Props) => {
  const rand = useMemo(() => crypto.getRandomValues(new Uint8Array(1)), []);
  return (
    <div className={style.container}>
      {Object.entries(COMPOSITION_EN_TO_JP_LABELS).map(([en, jp]) => (
        <label htmlFor={`${rand}${en}`} key={en} className={style.radio_group}>
          <input
            type="radio"
            id={`${rand}${en}`}
            name="category"
            value={en}
            checked={category === en}
            onChange={(e) =>
              onCategoryChange(e.target.value as CompositionEnToJpLabelKeys)
            }
          />
          <span>{jp}</span>
        </label>
      ))}
    </div>
  );
};
