import {
  COMPOSITION_EN_TO_JP_LABELS,
  CompositionEnToJpLabelKeys,
} from "@/entities/resas";
import style from "./styles.module.css";

type Props = {
  category: CompositionEnToJpLabelKeys;
  onCategoryChange: (category: CompositionEnToJpLabelKeys) => void;
};

export const CategoryRadioList = ({ category, onCategoryChange }: Props) => {
  const rand = crypto.getRandomValues(new Uint8Array(1));
  return (
    <form className={style.container}>
      {Object.entries(COMPOSITION_EN_TO_JP_LABELS).map(([en, jp]) => (
        <div key={en}>
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
          <label htmlFor={`${rand}${en}`}>{jp}</label>
        </div>
      ))}
    </form>
  );
};
