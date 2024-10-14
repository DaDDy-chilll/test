// src/axeConfig.ts
import React from "react";
import ReactDOM from "react-dom";
import axe from "@axe-core/react";

// Disable color contrast rule by overriding it in the rules array
export const initializeAxe = () => {
  axe(React, ReactDOM, 1000, {
    rules: [
      {
        id: "color-contrast",
        enabled: false, // Disable color contrast check
      },
    ],
  });
};
