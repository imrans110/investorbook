import React from "react";
import { Dimmer, Loader as UILoader } from "semantic-ui-react";

const Loader = () => {
  return (
    <Dimmer active inverted>
      <UILoader inverted>Loading</UILoader>
    </Dimmer>
  );
};

export default Loader;
