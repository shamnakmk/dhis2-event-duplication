import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import EventFetch from "./EventFetch";
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

      <Button primary small onClick={onClick}>
        Render
      </Button>

      {render && <EventFetch eventId={inputEvent} />}
    </div>
  );
};

export default App;
