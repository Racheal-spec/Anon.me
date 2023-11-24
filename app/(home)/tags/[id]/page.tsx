import React, { Suspense } from "react";
import Loading from "../../Loading";

import TagsDetails from "./TagsDetails";

const Tags = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TagsDetails />
    </Suspense>
  );
};

export default Tags;
