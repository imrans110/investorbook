import React from "react";
import omit from "lodash-es/omit";

export const getNumberLocale = (number) => {
  return Intl.NumberFormat().format(number);
};

export const omitProps = (component, propsToOmit) => {
  return (props) => React.createElement(component, omit(props, propsToOmit));
};
