import * as React from "react";

export function Switch(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" role="switch" {...props} />;
}
