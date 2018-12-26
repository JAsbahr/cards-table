import React from "react";
import CardListFromPuca from "./CardListFromPuca";
import CardListFilter from "./CardListFilter"
import CardsSummary from "./CardsSummary"

const DashFromPuca = (props) => (
  <div>
    <CardsSummary />
    <CardListFilter />
    <CardListFromPuca location={props.location.pathname} />
  </div>
);

export default DashFromPuca;
