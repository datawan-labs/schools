import { lazy, Suspense } from "solid-js";
import { Button } from "@/components/ui/button";
import DatawanLogo from "@/assets/text-dark.png";
import { Image, ImageFallback, ImageRoot } from "@/components/ui/image";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Executor = lazy(() => import("@/components/interfaces/executor"));

export const SidebarWrapper = () => {
  return (
    <Card class="hidden w-full lg:flex lg:flex-col">
      <CardHeader class="border-b py-1">
        <CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <ImageRoot class="w-auto rounded-none">
                <Image class="aspect-auto" src={DatawanLogo} />
                <ImageFallback>Datawan</ImageFallback>
              </ImageRoot>
            </TooltipTrigger>
            <TooltipContent>Datawan</TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback="loading...">
          <Executor />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export const DrawerWrapper = () => {
  return (
    <div class="flex flex-col items-center justify-center lg:hidden">
      <Drawer>
        <DrawerTrigger>
          <Button class="uppercase">open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div class="m-auto w-full max-w-lg">
            <Suspense fallback="loading...">
              <Executor />
            </Suspense>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const Widget = () => {
  return (
    <div class="absolute bottom-0 w-full p-4 lg:top-0 lg:bottom-auto lg:left-0 lg:max-w-sm">
      <SidebarWrapper />
      <DrawerWrapper />
    </div>
  );
};

export default Widget;
