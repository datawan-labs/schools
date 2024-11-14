import { lazy, Suspense } from "solid-js";
import { LayersLegend } from "./layers-legend";
import { WidgetLoader } from "./widget-loader";
import { Button } from "@/components/ui/button";
import DatawanLogo from "@/assets/text-dark.png";
import { IconBrandGithub } from "@tabler/icons-solidjs";
import { Image, ImageFallback, ImageRoot } from "@/components/ui/image";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WidgetMobile = lazy(() => {
  return import("@/components/widget/widget-wrapper-mobile");
});

const WidgetDekstop = lazy(() => {
  return import("@/components/widget/widget-wrapper-desktop");
});

const SidebarContainer = () => {
  return (
    <Card class="hidden w-full overflow-hidden lg:flex lg:flex-col">
      <CardHeader class="flex w-full flex-row items-center justify-between border-b py-1">
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
        <div class="flex flex-row items-center space-x-1">
          <Tooltip>
            <TooltipTrigger>
              <Button
                as="a"
                size="icon"
                target="_blank"
                variant="ghost"
                referrerPolicy="no-referrer"
                href="https://github.com/datawan-labs/schools/"
              >
                <IconBrandGithub class="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent class="overflow-auto">
        <Suspense fallback={<WidgetLoader />}>
          <WidgetDekstop />
        </Suspense>
      </CardContent>
    </Card>
  );
};

const DrawerContainer = () => {
  return (
    <div class="flex w-full flex-col items-center justify-center lg:hidden">
      <Drawer snapPoints={[0, 0.25, 1]}>
        <DrawerTrigger as={Button} variant="outline" class="z-10 uppercase">
          Analytics
        </DrawerTrigger>
        <DrawerContent class="flex max-h-svh flex-col">
          <div class="m-auto flex h-full w-full max-w-lg flex-1 flex-col overflow-auto p-4">
            <Suspense fallback={<WidgetLoader />}>
              <WidgetMobile />
            </Suspense>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const LegendContainer = () => {
  return (
    <Card class="hidden overflow-hidden lg:flex lg:flex-col">
      <CardContent class="overflow-auto p-0">
        <LayersLegend />
      </CardContent>
    </Card>
  );
};

export const Widget = () => {
  return (
    <div>
      <div class="absolute z-10 flex max-h-svh w-full flex-col overflow-hidden p-4 lg:top-0 lg:bottom-auto lg:left-0 lg:max-w-sm">
        <SidebarContainer />
      </div>
      <div class="absolute bottom-0 w-full p-4">
        <DrawerContainer />
      </div>
      <div class="absolute z-10 flex max-h-svh flex-col overflow-hidden p-4 lg:top-0 lg:right-0 lg:bottom-auto lg:max-w-sm">
        <LegendContainer />
      </div>
    </div>
  );
};
