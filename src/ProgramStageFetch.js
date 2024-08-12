import React from "react";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import EventFetch from "./EventFetch";

import { InputField } from "@dhis2/ui";
import { Button } from "@dhis2/ui";

const programStageQuery = (programStage) => {
  return {
    result: {
      resource: "programStages",
      params: {
        fields: "name,displayName,repeatable",
        filter: "id:eq:" + programStage,
      },
    },
  };
};
export const ProgramStageFetch = (props) => {
  const { loading, error, data } = useDataQuery(
    programStageQuery(props.programStageId)
  );

  return (
    <div>
      {loading && <CircularLoader />}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && data.result.programStages[0].repeatable && (
        <EventFetch eventId={props.eventId} />
      )}
      {data && !data.result.programStages[0].repeatable && (
        <span>
          {"This Program Stage is not repeatable and cannot be duplicated"}
        </span>
      )}
    </div>
  );
};

export default ProgramStageFetch;
