import React, { useState } from "react";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import ProgramStageFetch from "./ProgramStageFetch";

import { InputField } from "@dhis2/ui";
import { Button } from "@dhis2/ui";

//eventId?: string;
const createEventQuery = (eventId) => {
  console.log("the event id received by createEventQuery is" + eventId);
  return {
    result: {
      resource: "tracker/events",
      params: {
        order: "created:desc",
        pageSize: 10,
        fields: "*",
        event: eventId,
      },
    },
  };
};
export const EventFetch = (props) => {
  console.log("the event id received by component is" + props.eventId);
  const { loading, error, data } = useDataQuery(
    createEventQuery(props.eventId)
  );

  console.log("the props received is", props);

  return (
    <div>
      {loading && <CircularLoader />}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && (
        <ProgramStageFetch
          programStageId={data.result.instances[0].programStage}
          eventObject={data.result.instances[0]}
        />
      )}
    </div>
  );
};

export default EventFetch;
