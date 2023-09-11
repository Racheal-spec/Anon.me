import PageLoader from "../components/PageLoader/PageLoader";
import loader from "../../Assets/svgs/loader.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        // className={styles.loaderstyles}
        style={{
          margin: "auto",
          background: "transparent",
          display: "block",
          shapeRendering: "auto",
          transform: "translate(0px, 200px)",
        }}
        width="120px"
        height="120px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#FF6481"
          stroke="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51;360 50 51"
          ></animateTransform>
        </path>
      </svg>
    </div>
  );
}
