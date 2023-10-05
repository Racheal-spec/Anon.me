import React, { Suspense } from "react";
import DetailsComp from "./DetailsComp";
import Loading from "../../Loading";
import dynamic from "next/dynamic";
import { AblyProvider } from "ably/react";

const AblyDetailsComp = dynamic(() => import("./DetailsComp"), { ssr: false });

const PostDetails = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <AblyDetailsComp />
      </div>
    </Suspense>
  );
};

export default PostDetails;
