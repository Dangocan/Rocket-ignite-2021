import React from "react";
import { Container } from "./style";
import { Summary } from "../Summary";
import { TrasactionsTable } from "../TrasactionsTable";

export function DashBoard() {
  return (
    <Container>
      <Summary />
      <TrasactionsTable />
    </Container>
  );
}
