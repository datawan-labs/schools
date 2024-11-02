import { lazy, Suspense } from "solid-js";
import { Button } from "@/components/ui/button";
import { IconTerminal } from "@tabler/icons-solidjs";
import { WidgetLoader } from "@/components/widget/widget-loader";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const Shell = lazy(() => import("@/components/widget/shell-canvas"));
const Metadata = lazy(() => import("@/components/widget/metadata-table.md"));

export const ShellWidget = () => {
  return (
    <Dialog>
      <DialogTrigger
        as={Button}
        variant="outline"
        class="w-full flex-1 space-x-2 uppercase"
      >
        <IconTerminal class="size-4" />
        <span class="hidden lg:block">Console</span>
      </DialogTrigger>
      <DialogContent class="flex max-h-[80%] max-w-[80%] flex-col">
        <DialogHeader>
          <DialogTitle>Shell</DialogTitle>
        </DialogHeader>
        <div class="flex h-full w-full flex-1 flex-row gap-x-2 overflow-hidden">
          <div class="flex-1">
            <Suspense fallback={<WidgetLoader />}>
              <Shell />
            </Suspense>
          </div>
          <div class="w-full max-w-sm overflow-y-auto overflow-x-hidden border-l pl-2">
            <Suspense fallback={<WidgetLoader />}>
              <div class="prose dark:prose-invert prose-inline-code:rounded-md prose-inline-code:bg-accent prose-inline-code:px-1 prose-inline-code:before:content-none prose-inline-code:after:content-none">
                <Metadata />
              </div>
            </Suspense>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
