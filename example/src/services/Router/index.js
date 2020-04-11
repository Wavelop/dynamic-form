import React from "react";
import { withRouter as withRouterDefault } from "react-router";
import qs from "query-string";

import { useApplicationDispatch } from "Services";

const withHistoryListener = HistoryListener => WrappedComponent => {

  function WithHistoryListener(props) {
    const dispatch = useApplicationDispatch();

    const { location } = props;
    const { search } = location;
    const { uid } = qs.parse(search, {
      ignoreQueryPrefix: true
    });

    if (uid) {
      dispatch({ type: "UPDATE_UID", uid });
    }

    return <WrappedComponent {...props} />;
  }

  return withRouterDefault(WithHistoryListener);
};

export default withHistoryListener;
