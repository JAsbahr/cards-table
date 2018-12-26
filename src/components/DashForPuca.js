import React from "react";
import CardListForPuca from "./CardListForPuca";
import CardListFilter from "./CardListFilter"
import CardsSummary from "./CardsSummary"

const DashForPuca = (props) => (
    <div>
        <CardsSummary />
        <CardListFilter />
        <CardListForPuca location={props.location.pathname} />
    </div>
);

export default DashForPuca;
