import React from "react";
import { Card, Stack, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'

import EventBadge from './EventBadge';

class EventListItem extends React.Component {
    render() {
    let created  = new Date(this.props.item.created);
    let modified = new Date(this.props.item.modified);
    let delta = Math.round((modified - created) / 60000);
    
    let h_delta;
    if (delta < 1) h_delta = "instant";
    else if (delta < 60) h_delta = delta + " minutes";
    else h_delta = Math.floor(delta/60) + " hours";
    if (! this.props.item.severity) h_delta = "ongoing";

    return (
    <Card>
        <Card.Header>
          <ReactTimeAgo date={created} locale="en-US"/>
          <>&nbsp;</>
          (&#9881; {h_delta})
        </Card.Header>

        <Card.Body>
        <Card.Title>
        <Link to={"/event/"+this.props.item.id} className="text-decoration-none">
            <h3 className="subject">{this.props.item.subject}</h3>
        </Link>
        </Card.Title>
        <Stack direction="horizontal" gap={1}>
        <div><Badge className={"badge-severity-"+this.props.item.severity} text="dark">{this.props.item.severity}</Badge></div>
        <EventBadge type="host" badge={this.props.item.host} />
        <EventBadge type="sender" badge={this.props.item.sender} />
        </Stack>
        <Stack gap={1}>
            <EventTextField title="Description:" text={this.props.item.description}/>
            <EventTextField title="Standard error:" text={this.props.item.stderr}/>
            <EventTextField title="Standard output:" text={this.props.item.stdout}/>
        </Stack>
        </Card.Body>
    </Card>
    )
    }
  }

  class EventTextField extends React.Component {
    render() {
      if ( ! this.props.text ) return "";
      return (
        <div>
          <hr/>
          <h4>{this.props.title}</h4>
          <pre>
            {this.props.text}
          </pre>
        </div>
        );
    };
  }

export default EventListItem;