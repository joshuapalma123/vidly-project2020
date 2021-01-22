import React, { Component } from "react";

//Input -> liked: boolean
//Output -> onClick

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";

    return (
      <div>
        <i
          onClick={this.props.onClick}
          className={classes}
          aria-hidden="true"
          style={{ cursor: "pointer" }}
        ></i>
      </div>
    );
  }
}

export default Like;
