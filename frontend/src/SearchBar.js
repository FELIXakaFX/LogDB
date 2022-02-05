import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

import URLAddParam from "./URLAddParam";

class SearchBarComponent extends React.Component {
    submitForm (e) {
        e.preventDefault();
        let url = URLAddParam('search', e.target[0].value, this.props.location);
        this.props.navigate(url);
      }

    render() {
        return (
        <Form onSubmit={this.submitForm.bind(this)} className="d-flex">
            <FormControl
                type="text"
                id="header-search"
                placeholder="Search logs"
                name="search"
                className="me-2"
                disabled={this.props.disabled}
            />
            <Button variant="outline-primary" type="submit" disabled={this.props.disabled}>Search</Button>
        </Form>
        )
    }
};

function SearchBar(props) {
    let location = useLocation();
    let navigate = useNavigate();

    let disabled = null;
    let item_type = location.pathname.split('/')[1];
    if (item_type === "event" ||
        item_type === "hosts" ||
        item_type === "senders") disabled = true;

    return <SearchBarComponent location={location} navigate={navigate} disabled={disabled}/>
}

export default SearchBar;