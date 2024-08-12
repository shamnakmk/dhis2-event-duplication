import React, { useState } from "react";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import Replicate from "./Replicate";

import { InputField } from "@dhis2/ui";
import { Button } from "@dhis2/ui";

//eventId?: string;
const createEventQuery = (eventId) => {
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
  const { loading, error, data } = useDataQuery(
    createEventQuery(props.eventId)
  );

  return (
    <div>
      {loading && <CircularLoader />}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && <Replicate eventObject={data.result.instances[0]} />}
    </div>
  );
};

export default EventFetch;
