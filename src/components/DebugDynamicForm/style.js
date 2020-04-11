import { createUseStyles } from "react-jss";

export const useStyles = theme => {

  const { colorPrimary } = theme;

  return createUseStyles({
    background: {
      backgroundColor: colorPrimary,
      whiteSpace: "pre-wrap"
    }
  });
};
