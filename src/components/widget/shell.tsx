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

export const ShellWidget = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" class="w-full space-x-2 uppercase">
          <IconTerminal class="size-4" />
          <span class="hidden lg:block">Console</span>
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Shell</DialogTitle>
        </DialogHeader>
        <div class="relative w-full overflow-hidden">
          <Suspense fallback={<WidgetLoader />}>
            <Shell />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};
