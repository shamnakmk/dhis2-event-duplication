import React, { useState } from "react";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
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

const Replicate = (props) => {
  const [inputNumber, setInputNumber] = useState("");

  const [mutate, { error, loading, data, called }] =
    useDataMutation(myMutation);
  const d = new Date();

  const onDuplicateClick = async () => {
    props.eventObject.event = null;
    props.eventObject.occurredAt = d.toISOString();
    props.eventObject.updatedAt = d.toISOString();
    if (props.eventObject.status === "COMPLETED") {
      props.eventObject.completedAt = d.toISOString();
    }

    let numberOfDuplicates = parseInt(inputNumber);
    if (isNaN(numberOfDuplicates) || numberOfDuplicates <= 0) {
      alert("Please enter a valid number for duplication.");
      return;
    }

    let eventArray = [];

    for (let i = 0; i < numberOfDuplicates; i++) {
      eventArray.push(props.eventObject);
    }

    await mutate({ eventArray: eventArray });
  };

  return (
    <div>
      <InputField
        label={"Enter the number of times this event has to duplicated"}
        placeholder={"A number"}
        value={inputNumber}
        onChange={({ value }) => setInputNumber(value)}
      />

      <Button primary small disabled={loading} onClick={onDuplicateClick}>
        Duplicate
      </Button>

      {loading && <CircularLoader />}

      {error && <span>{`ERROR: ${error} `}</span>}
      {!loading && !error && called && (
        <span>
          {inputNumber == 1
            ? "Successfully duplicated event " + inputNumber + " time"
            : "Successfully duplicated event " + inputNumber + " times"}
        </span>
      )}
    </div>
  );
};
export default Replicate;
