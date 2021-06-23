import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";

const Directory = (props) => {
  return (
    <div className="directory-menu">
      {props.sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  // memoization using reselect
  const selectSections = createSelector(
    [(state) => state.directory.sections],
    (sections) => sections
  );
  return {
    sections: selectSections(state),
  };
};

export default connect(mapStateToProps)(Directory);
