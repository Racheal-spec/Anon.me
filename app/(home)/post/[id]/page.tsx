import React, { Suspense } from "react";
import Loading from "../../Loading";
import DetailsComp from "./DetailsComp";

const PostDetails = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <DetailsComp />
      </div>
    </Suspense>
  );
};

export default PostDetails;
