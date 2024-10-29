import { splitProps } from "solid-js";
import { cn } from "@/libs/classnames";
import type { Component, ComponentProps } from "solid-js";

const Label: Component<ComponentProps<"label">> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <label
      class={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        props.class
      )}
      {...rest}
    />
  );
};

export { Label };
