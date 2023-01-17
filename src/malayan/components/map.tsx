import React from "react";
import map from "./malayan.png";

export const MalayanMap = (props: {}) => {
  return <img style={{ height: "75vh" }} src={map} />;
};

export const MapOverlay = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "75vh",
        width: "53.58vh",
      }}
    >
      {props.children}
    </div>
  );
};
