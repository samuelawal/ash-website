import React from "react";

/** Replaces the Payload mark in the admin sidebar and browser-tab-adjacent chrome. */
export function AshipaIcon() {
  return (
    <div className="ashipa-brand ashipa-brand--icon">
      <img
        src="/brand/ashipa-logo-dark.png"
        alt="Ashipa Electric"
        className="ashipa-brand__on-light"
      />
      <img
        src="/brand/ashipa-logo-white.png"
        alt="Ashipa Electric"
        className="ashipa-brand__on-dark"
      />
    </div>
  );
}

export default AshipaIcon;
