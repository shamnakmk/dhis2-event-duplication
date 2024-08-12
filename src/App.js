import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import ProgramStageFetch from "./ProgramStageFetch";
import { InputField } from "@dhis2/ui";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableRowHead,
  TableCellHead,
  TableCell,
  TableFoot,
  Input,
} from "@dhis2/ui";

export const App = () => {
  const [inputEvent, setInputEvent] = useState("");
  const [programStage, setProgramStage] = useState("");
  const [render, setRender] = useState(false);
  const onClick = () => {
    setRender(true);
  };

  return (
    <div>
      <InputField
        label={"Event Id"}
        placeholder={"Uid of the Event"}
        value={inputEvent}
        onChange={({ value }) => {
          setInputEvent(value);
          setRender(false);
        }}
      />
      <InputField
        label={"Program Stage"}
        placeholder={"Uid of the Program Stage"}
        value={programStage}
        onChange={({ value }) => setProgramStage(value)}
      />

      <Button primary small onClick={onClick}>
        Render
      </Button>

      {render && (
        <ProgramStageFetch eventId={inputEvent} programStage={programStage} />
      )}
    </div>
  );
};

export default App;
