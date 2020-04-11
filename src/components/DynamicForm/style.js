import { createUseStyles } from "react-jss";

export const useStyles = theme => {
  return createUseStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%"
    }
  });
};
