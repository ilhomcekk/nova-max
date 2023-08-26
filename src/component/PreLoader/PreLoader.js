import React from "react";
import "./PreLoader.scss";

export default function PreLoader({
  absolute,
  top,
  left,
  right,
  bottom,
  background,
  margin,
  zIndex,
  alignItems,
  transform,
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: alignItems,
        position: absolute,
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        background: background,
        zIndex: `${zIndex ? zIndex : "5"}`,
        transform: transform,
      }}
    >
      <div
        className="loadingio-spinner-eclipse-0yeinnyikbjq"
        style={{ margin: margin, background: background }}
      >
        <div className="ldio-49gy765oit4">
          <div></div>
        </div>
      </div>
    </div>
  );
}
