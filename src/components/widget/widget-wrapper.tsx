import "@/services/setup";
import { PointWidget } from "./point";
import { ShellWidget } from "./shell";

const WidgetWrapper = () => {
  return (
    <div class="flex flex-col space-y-2">
      <PointWidget />
      <ShellWidget />
    </div>
  );
};

export default WidgetWrapper;
