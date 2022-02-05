import React from "react";
import { Badge } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

class EventBadge extends React.Component {
    render() {
      return (
        <NavLink to={"/"+this.props.type+"/"+this.props.badge.id} className="text-decoration-none">
          <Badge className={"badge-"+this.props.type} text="dark">{this.props.badge.pretty_name}</Badge>
        </NavLink>
      );
    }
  }

export default EventBadge;