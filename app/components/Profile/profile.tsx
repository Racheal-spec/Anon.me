import React, { useState } from "react";

const profile = () => {
  const [showprofile, setShowProfile] = useState(false);

  return (
    <>
      {showprofile && (
        <div>
          <ul>
            <li>profile</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default profile;
