import React from "react";
import moment from "moment";
function TimeAgo({ date }) {
  const timeago = moment(date).fromNow();
  return <div>{timeago.replace("in","")}</div>;
}

export default TimeAgo;
