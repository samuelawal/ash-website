import React from "react";

/**
 * Replaces the Payload wordmark on the login and create-first-user screens.
 *
 * Both colour variants are rendered and swapped with CSS in `custom.scss`
 * rather than reading the theme in JS — the admin ships a `data-theme`
 * attribute on <html> before hydration, so a CSS swap avoids a flash of the
 * wrong logo on load.
 */
export function AshipaLogo() {
  return (
    <div className="ashipa-brand ashipa-brand--logo">
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

export default AshipaLogo;
