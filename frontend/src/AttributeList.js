import React from "react";
import axios from "axios";

import { Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import EventBadge from "./EventBadge";
import PageButton from "./PageButton";

class AttributeListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          count: 0,
          next: null,
          previous: null,
          results: []
        }
        this.loadAttributeList = this.loadAttributeList.bind(this)
      }

    render() {
        return (
          <Stack gap={0}>
            <PageButton url={this.state.previous} directon="Previous" location={this.props.location}/>
                {this.state.results.map(item => (
                    <span style={{ fontSize: "1.5rem" }}><EventBadge key={item.id} type={this.props.attribute} badge={item} /></span>
                ), this)}
            <PageButton url={this.state.next} directon="Next" location={this.props.location}/>
          </Stack>
        )
    }

    componentDidMount() {
        this.loadAttributeList(this.props.api_url);
      }
  
      componentDidUpdate(prevProps) {
        if (this.props.api_url !== prevProps.api_url) {
          this.setState({results: []});
          this.loadAttributeList(this.props.api_url);
        }
      }
  
      loadAttributeList(url) {
        axios.get(url)
        .then((res) => this.setState(res.data))
        .catch((err) => console.log(err));
      }
}

function AttributeList(props) {
    let location = useLocation();
    let attribute = props.attribute;
    return <AttributeListComponent api_url={"/api/"+attribute+"s/"+location.search} attribute={attribute} location={location}/>
}

export default AttributeList;