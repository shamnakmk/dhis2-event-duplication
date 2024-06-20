import React, { useState } from "react";
import { useDataMutation } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";

import { InputField } from "@dhis2/ui";
import { Button } from "@dhis2/ui";

const myMutation = {
  resource: "tracker",
  type: "create",
  params: {
    async: false,
  },
  data: ({ eventArray }) => {
    return { events: eventArray };
  },
};

export const Duplicate = (props) => {
  const [inputNumber, setInputNumber] = useState("");

  const [
    mutate,
    { error: mutateError, loading: mutateLoading, data: mutateData, called },
  ] = useDataMutation(myMutation);

  const onDuplicateClick = async () => {
    let numberOfDuplicates = parseInt(inputNumber);
    if (isNaN(numberOfDuplicates) || numberOfDuplicates <= 0) {
      alert("Please enter a valid number for duplication.");
      return;
    }

    let eventArray = [];

    for (let i = 0; i < numberOfDuplicates; i++) {
      props.event.event = null;

      eventArray.push(props.event);
    }

    await mutate({ eventArray: eventArray });
  };

  return (
    <div>
      <InputField
        label={"Number"}
        placeholder={"Number of the duplication"}
        value={inputNumber}
        onChange={({ value }) => setInputNumber(value)}
      />

      <Button primary small disabled={mutateLoading} onClick={onDuplicateClick}>
        Duplicate
      </Button>

      {mutateLoading && <CircularLoader />}

      {mutateError && (
        <span>{`ERROR: ${mutateError} and DATA ${mutateData}`}</span>
      )}
      {!mutateLoading && !mutateError && called && (
        <span>{`Succesfully duplicated`}</span>
      )}
    </div>
  );
};

export default Duplicate;
