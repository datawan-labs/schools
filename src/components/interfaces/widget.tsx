import { lazy, Suspense } from "solid-js";
import { useMap } from "@/components/ui/maps";
import { Button } from "@/components/ui/button";
import DatawanLogo from "@/assets/text-dark.png";
import { DATAWAN_MAPS_STYLE } from "@/libs/maps";
import { Image, ImageFallback, ImageRoot } from "@/components/ui/image";
import { IconBrandGithub, IconMapDiscount } from "@tabler/icons-solidjs";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Executor = lazy(() => import("@/components/interfaces/executor"));

export const SidebarWrapper = () => {
  const map = useMap();

  /**
   * change basemaps based on current styles
   */
  const changeBaseMaps = () =>
    map()?.setStyle(
      (map()?.getStyle().sprite as string).includes("dark")
        ? DATAWAN_MAPS_STYLE.grayscale
        : DATAWAN_MAPS_STYLE.dark
    );

  return (
    <Card class="hidden w-full lg:flex lg:flex-col">
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
          <Tooltip>
            <TooltipTrigger>
              <Button size="icon" variant="ghost" onclick={changeBaseMaps}>
                <IconMapDiscount class="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Change Basemaps</TooltipContent>
          </Tooltip>
        </div>
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
