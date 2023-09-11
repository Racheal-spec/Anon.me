import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import DetailsComp from "./DetailsComp";
import Loading from "../../Loading";

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
