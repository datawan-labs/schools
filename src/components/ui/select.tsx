import { splitProps } from "solid-js";
import { cn } from "@/libs/classnames";
import type { ParentProps, ValidComponent } from "solid-js";
import { Select as SelectPrimitive } from "@kobalte/core/select";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type {
  SelectItemProps,
  SelectTriggerProps,
  SelectContentProps,
} from "@kobalte/core/select";
import { IconCaretDown, IconCheck } from "@tabler/icons-solidjs";
import { layer } from "@/stores";
import { unwrap } from "solid-js/store";

export const Select = SelectPrimitive;

export const SelectValue = SelectPrimitive.Value;

export const SelectDescription = SelectPrimitive.Description;

export const SelectErrorMessage = SelectPrimitive.ErrorMessage;

export const SelectItemDescription = SelectPrimitive.ItemDescription;

export const SelectHiddenSelect = SelectPrimitive.HiddenSelect;

export const SelectSection = SelectPrimitive.Section;

type selectTriggerProps<T extends ValidComponent = "button"> = ParentProps<
  SelectTriggerProps<T> & { class?: string }
>;

export const SelectTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, selectTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as selectTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <SelectPrimitive.Trigger
      class={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-shadow placeholder:text-muted-foreground focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <IconCaretDown class="size-4" />
    </SelectPrimitive.Trigger>
  );
};

type selectContentProps<T extends ValidComponent = "div"> =
  SelectContentProps<T> & {
    class?: string;
  };

export const SelectContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, selectContentProps<T>>
) => {
  const [local, rest] = splitProps(props as selectContentProps, ["class"]);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[closed]:animate-out data-[expanded]:animate-in",
          local.class
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox class="p-1 focus-visible:outline-none" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

type selectItemProps<T extends ValidComponent = "li"> = ParentProps<
  SelectItemProps<T> & { class?: string }
>;

export const SelectItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, selectItemProps<T>>
) => {
  const [local, rest] = splitProps(props as selectItemProps, [
    "class",
    "children",
  ]);

  return (
    <SelectPrimitive.Item
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <SelectPrimitive.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <IconCheck class="size-3" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemLabel>{local.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  );
};
