import { IconLoader2 } from "@tabler/icons-solidjs";

export const WidgetLoader = () => {
  return (
    <div class="flex min-h-64 w-full flex-col items-center justify-center">
      <IconLoader2 class="size-8 animate-spin duration-700 ease-in-out" />
      <div class="text-muted-foreground">please wait...</div>
    </div>
  );
};
