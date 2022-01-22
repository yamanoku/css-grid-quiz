import { useCallback, useState } from "react";
import { GridArea } from "../../../pages/QuestionPage/components/GridArea";
import { GridPosition } from "../../GridPosition";
import classes from "./Tutorial.module.css";

export const Tutorial1: React.VFC = () => {
  const { gridDef, selectedItems, toggleItem } = useSampleGrid();
  return (
    <article className={classes.tutorial}>
      <h1>Tutorial #1</h1>
      <p>Consider the following HTML structure:</p>
      <pre>
        <code>
          {`
<div class="grid-container">
  <div class="grid-item"></div>
</div>
`.trim()}
        </code>
      </pre>
      <p>You are given style definitions for below elements. Example:</p>
      <pre>
        <code>
          {`
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.grid-item {
  grid-column: 1;
  grid-row: 1;
}
`.trim()}
        </code>
      </pre>
      <p>
        Click/tap all grid cells occupied by the <code>.grid-item</code>{" "}
        element. Press “Check” button to check your answer.
      </p>
      <p>Sample:</p>
      <div className={classes.sampleGridWrapper}>
        <GridArea
          gridDef={gridDef}
          selectedItems={selectedItems}
          toggleItem={toggleItem}
        />
      </div>
    </article>
  );
};

function useSampleGrid() {
  const gridDef = {
    columns: 2,
    rows: 2,
  };
  const [selectedItems, setSelectedItems] = useState<readonly GridPosition[]>([
    "1-1",
  ]);
  const toggleItem = useCallback((column: number, row: number) => {
    setSelectedItems((selectedItems) => {
      if (selectedItems.includes(`${column}-${row}`)) {
        const newSelectedItems = selectedItems.filter(
          (item) => item !== `${column}-${row}`
        );
        return newSelectedItems;
      } else {
        return [...selectedItems, `${column}-${row}`];
      }
    });
  }, []);

  return {
    gridDef,
    selectedItems,
    toggleItem,
  };
}
