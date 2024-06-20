import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import Duplicate from "./Duplicate";
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

const PAGE_SIZE = 100;
const query = {
  result: {
    resource: "tracker/events",
    params: ({ trackedEntity, program }) => ({
      order: "created:desc",
      pageSize: PAGE_SIZE,
      fields: "*",
      trackedEntity,
      program,
    }),
  },
};

export const Events = () => {
  const [inputTrackedEntityId, setInputTrackedEntityId] = useState("");
  const [inputProgramId, setInputProgramId] = useState("");

  const { loading, error, data, refetch } = useDataQuery(query);

  const onFetchClick = async () => {
    refetch({ trackedEntity: inputTrackedEntityId, program: inputProgramId });
  };
  return (
    <div>
      <InputField
        label={"TrackedEntity Id"}
        placeholder={"Uid of the TrackedEntity"}
        value={inputTrackedEntityId}
        onChange={({ value }) => setInputTrackedEntityId(value)}
      />
      <InputField
        label={"program Id"}
        placeholder={"Uid of the program"}
        value={inputProgramId}
        onChange={({ value }) => setInputProgramId(value)}
      />

      <Button primary small disabled={loading} onClick={onFetchClick}>
        Fetch
      </Button>

      <h3>Events</h3>

      {loading && <CircularLoader />}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && (
        <pre>
          <Table>
            <TableHead>
              <TableRowHead>
                <TableCellHead>Tracked Entity</TableCellHead>
                <TableCellHead>Program</TableCellHead>
                <TableCellHead>Program Stage</TableCellHead>
                <TableCellHead>Enrollment</TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {data.result.instances.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.trackedEntity}</TableCell>
                    <TableCell>{item.program}</TableCell>
                    <TableCell>{item.programStage}</TableCell>
                    <TableCell>{item.enrollment}</TableCell>
                    <TableCell>
                      <Duplicate event={item} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFoot>
              <TableRow>
                <TableCell colSpan="8"></TableCell>
              </TableRow>
            </TableFoot>
          </Table>
        </pre>
      )}
    </div>
  );
};

export default Events;
