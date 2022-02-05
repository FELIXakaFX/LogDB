import React from "react";

import { Link } from 'react-router-dom';
import URLAddParam from './URLAddParam';

class PageButton extends React.Component {
    render() {
      if (this.props.url != null) {
        const searchParams = new URLSearchParams(this.props.url.split('?')[1]);
        let target_page = searchParams.get('page');
        let url = URLAddParam('page', target_page, this.props.location);
        if (target_page == null) url="?";
        return <Link className="btn btn-primary" to={url}>{this.props.directon} Page</Link>
      }
      return "";
    }
  }

export default PageButton;