import { createUseStyles } from "react-jss";

export const useStyles = theme => {
  return createUseStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      padding: "12px 0"
    },
    hide: {
      display: "none"
    }
  });
};
