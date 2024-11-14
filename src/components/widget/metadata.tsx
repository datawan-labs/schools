import { cn } from "@/libs/classnames";
import { lazy, Suspense } from "solid-js";
import { Button } from "@/components/ui/button";
import { IconTableColumn } from "@tabler/icons-solidjs";
import { WidgetLoader } from "@/components/widget/widget-loader";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const Metadata = lazy(() => import("@/components/widget/metadata-query.md"));

export const MetadataWidget = () => {
  return (
    <Dialog>
      <DialogTrigger
        as={Button}
        variant="outline"
        class="w-full flex-1 space-x-2 uppercase"
      >
        <IconTableColumn class="size-4" />
        <span class="hidden lg:block">Metadata</span>
      </DialogTrigger>
      <DialogContent class="flex max-w-3xl flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Metadata</DialogTitle>
        </DialogHeader>
        <div
          class={cn(
            "relative w-full flex-1 overflow-auto ",
            "prose dark:prose-invert prose-inline-code:rounded-md prose-inline-code:bg-accent prose-inline-code:px-1 prose-inline-code:before:content-none prose-inline-code:after:content-none"
          )}
        >
          <Suspense fallback={<WidgetLoader />}>
            <Metadata />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};
