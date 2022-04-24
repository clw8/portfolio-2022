import * as React from "react";
import PropTypes from "prop-types";

const Loader = (props) => {
  const { show } = props;
  return (
    <div className={`loader ${!show ? "loaded" : ""}`}>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  show: PropTypes.bool,
};