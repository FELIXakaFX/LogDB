import React from 'react';
import { Stack } from "react-bootstrap";
import axios from "axios";

import { useLocation, useParams } from 'react-router-dom';
import EventListItem from './EventItem';
import PageButton from "./PageButton";

class EventListComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        count: 0,
        next: null,
        previous: null,
        results: []
      }
      this.loadEventList = this.loadEventList.bind(this)
    }

    render() {
      return (
        <Stack className={"mt-2 mb-2" + (this.state.loading ? " loading" : " loaded")} gap={2}>
          <PageButton url={this.state.previous} directon="Previous" location={this.props.location}/>
          {this.state.results.map(item => (
            <EventListItem key={item.id} item={item} />
          ))}
          <PageButton url={this.state.next} directon="Next" location={this.props.location}/>
        </Stack>
      );
    }

    componentDidMount() {
      this.loadEventList(this.props.api_url);
    }

    componentDidUpdate(prevProps) {
      if (this.props.api_url !== prevProps.api_url) {
        this.loadEventList(this.props.api_url);
      }
    }

    loadEventList(url) {
      this.setState({
        loading: true
      })
      axios.get(url)
      .then((res) => this.renderEventList(res.data))
      .catch((err) => console.log(err));
    }

    renderEventList(data) {
      this.setState(data);
      this.setState({
        loading: false
      })
      window.scrollTo(0, 0);
    }
  }

  function EventList(props) {
    let api_url = "/api/logs/";
    let location = useLocation();
    let params = useParams();

    const searchParams = new URLSearchParams(location.search);
    if ( params.id )
      searchParams.append(props.field, params.id);
    
    api_url += "?"+searchParams.toString();

    console.log(api_url);
    return <EventListComponent api_url={api_url} location={location}/>
  }

export default EventList;