import { useMemo } from "react";
import { Link } from "react-location";
import { QuizData } from "../../../questions/QuestionData";
import { indent } from "../../../utils/indent";
import { simpleParseCss } from "../../../utils/simpleParseCss";
import { GridArea } from "../components/GridArea";
import { GridAreaExtensionControl } from "../components/GridAreaExtensionControl";
import { useQuizPageLogic } from "../logic/useQuizPageLogic";
import classes from "../QuestionPage.module.css";

type Props = {
  quizId: string;
  quizData: QuizData;
  cheat: boolean;
};

export const QuizPage: React.VFC<Props> = ({ quizId, quizData, cheat }) => {
  const { gridStyle, subgridStyle, itemStyle, gridDef, extensible } = quizData;

  const { gridStyleDisp, gridStyleObj } = useMemo(
    () => ({
      gridStyleDisp: `.container {
  display: grid;
${indent(gridStyle)}
}`,
      gridStyleObj: simpleParseCss(gridStyle),
    }),
    [gridStyle]
  );
  const { subgridStyleDisp, subgridStyleObj } = useMemo(() => {
    if (!subgridStyle) {
      return { subgridStyleDisp: undefined, subgridStyleObj: undefined };
    }
    return {
      subgridStyleDisp: `.subgrid {
  display: grid;
${indent(subgridStyle)}
}`,
      subgridStyleObj: simpleParseCss(subgridStyle),
    };
  }, [subgridStyle]);
  const { itemStyleDisp, itemStyleObj } = useMemo(
    () => ({
      itemStyleDisp: `.item {
${indent(itemStyle)}
}`,
      itemStyleObj: simpleParseCss(itemStyle),
    }),
    [itemStyle]
  );

  const {
    selectedItems,
    buttonState,
    extension,
    toggleItem,
    extendGrid,
    check,
    reset,
  } = useQuizPageLogic(quizId, quizData);

  const mainGrid = (
    <div className={classes.mainGridContainer}>
      <GridArea
        hasGrid
        extension={extension}
        className={classes.mainGrid}
        style={gridStyleObj}
        gridDef={gridDef}
        selectedItems={selectedItems}
        toggleItem={toggleItem}
      />
      {cheat && (
        <GridArea
          className={classes.cheatGrid}
          extension={extension}
          style={gridStyleObj}
          gridDef={gridDef}
        >
          {subgridStyleObj ? (
            <div className={classes.cheatSubgrid} style={subgridStyleObj}>
              <div className={classes.cheatItem} style={itemStyleObj} />
            </div>
          ) : (
            <div className={classes.cheatItem} style={itemStyleObj} />
          )}
        </GridArea>
      )}
    </div>
  );

  return (
    <section className={classes.page}>
      <h1 className={classes.titleArea}>Page {quizId}</h1>
      <div className={classes.defs}>
        <pre className={classes.eachDef}>
          <code>{gridStyleDisp}</code>
        </pre>
        {subgridStyleDisp ? (
          <pre className={classes.eachDef}>
            <code>{subgridStyleDisp}</code>
          </pre>
        ) : null}
        <pre className={classes.eachDef}>
          <code>{itemStyleDisp}</code>
        </pre>
      </div>
      <div className={classes.mainArea}>
        {extensible ? (
          <GridAreaExtensionControl onExtend={extendGrid}>
            {mainGrid}
          </GridAreaExtensionControl>
        ) : (
          mainGrid
        )}
      </div>
      <div className={classes.controlGrid}>
        <Link className={classes.goToTop} to="/">
          Go to Top
        </Link>
        <button onClick={reset}>Reset</button>
        {buttonState === "check" ? (
          <button className={classes.check} onClick={check}>
            Check
          </button>
        ) : buttonState === "correct" ? (
          <button className={classes.check} onClick={check}>
            Correct!
          </button>
        ) : buttonState === "wrong" ? (
          <button className={classes.wrong} onClick={check}>
            Wrong…
          </button>
        ) : null}
      </div>
    </section>
  );
};
