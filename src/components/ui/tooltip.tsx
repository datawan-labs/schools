import { cn } from "@/libs/classnames";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Tooltip as TooltipPrimitive } from "@kobalte/core/tooltip";
import { type ValidComponent, mergeProps, splitProps } from "solid-js";
import type {
  TooltipRootProps,
  TooltipContentProps,
} from "@kobalte/core/tooltip";

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const Tooltip = (props: TooltipRootProps) => {
  const merge = mergeProps<TooltipRootProps[]>({ gutter: 4 }, props);

  return <TooltipPrimitive {...merge} />;
};

type tooltipContentProps<T extends ValidComponent = "div"> =
  TooltipContentProps<T> & {
    class?: string;
  };

export const TooltipContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tooltipContentProps<T>>
) => {
  const [local, rest] = splitProps(props as tooltipContentProps, ["class"]);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 overflow-hidden rounded-md bg-accent-foreground px-3 py-1.5 text-primary-foreground text-xs data-[closed]:animate-out data-[expanded]:animate-in",
          local.class
        )}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  );
};
