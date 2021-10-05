import React from "react";
import styled from "styled-components";

const OuterMap = styled.div`
  position: relative;
  text-align: right;
  height: 400px;
`;

const MapFrame = styled.iframe`
  overflow: hidden;
  background: none !important;
  height: 100%;
  width: 100%;
  border: none;
`;

const Map = () => {
  return (
    <div style={{ height: "400px" }} className="mt-5">
      <OuterMap>
        <MapFrame
          src="https://maps.google.com/maps?q=acadia%20national%20park&t=&z=11&ie=UTF8&iwloc=&output=embed"
          scrolling="auto"
        ></MapFrame>
      </OuterMap>
    </div>
  );
};

export default Map;
