import React from "react";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import Replicate from "./Replicate";

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
  console.log(
    "the program stage id received by component is" + props.programStageId
  );
  const { loading, error, data } = useDataQuery(
    programStageQuery(props.programStageId)
  );

  return (
    <div>
      {loading && <CircularLoader />}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && data.result.programStages[0].repeatable && (
        <Replicate eventObject={props.eventObject} />
      )}
      {data && !data.result.programStages[0].repeatable && (
        <span>ProgramStage is not repeatable.</span>
      )}
    </div>
  );
};

export default ProgramStageFetch;
