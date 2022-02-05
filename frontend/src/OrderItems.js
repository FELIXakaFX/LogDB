import React from "react";
import { NavDropdown } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

import URLAddParam from "./URLAddParam";

class FilterItem extends React.Component {
    render() {
        let time_filters = {
            "Last 24 Hours": 1,
            "Last 7 days": 7,
            "Last 30 days": 30,
            "Last 365 days": 365,
        }

        let today = new Date();

        return (
            <NavDropdown title={this.props.name} disabled={this.props.disabled}>
                <Link className="dropdown-item" to=
                    {URLAddParam("ordering",    this.props.field, this.props.location)}>
                    Ascending
                </Link>
                <Link className="dropdown-item" to=
                    {URLAddParam("ordering", "-"+this.props.field, this.props.location)}>
                    Descending
                </Link>
                {this.props.name === "Severity" && [1, 2, 3, 4, 5].map(i => {
                return (
                    <Link key={i} className="dropdown-item" to=
                    {URLAddParam("severity__gte", i, this.props.location)}>
                    &ge; {i}
                    </Link>
                )})}
                {this.props.name === "Created" && Object.keys(time_filters).map(i => {
                    let date = new Date();
                    date.setDate(today.getDate() - time_filters[i]);
                    return (
                    <Link key={i} className="dropdown-item" to=
                    {URLAddParam("created__gte", date.toISOString(), this.props.location)}>
                    {i}
                    </Link>
                )})}
            </NavDropdown>
            )
    }
}

function OrderItems(props) {
    let filter_items = {
        "Severity": "severity,-created",
        "Created": "created",
    }

    let location = useLocation();
    
    let disabled = null;
    let item_type = location.pathname.split('/')[1];
    if (item_type === "event" ||
        item_type === "hosts" ||
        item_type === "senders") disabled = true;

    let result = [];
    Object.keys(filter_items).map(function(key, index) {
        return result.push(<FilterItem key={key} name={key} field={filter_items[key]} location={location} disabled={disabled} />);
      });

    return result;
}

export default OrderItems;