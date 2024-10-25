import "@/services/setup";
import { getPoints, getPoint2 } from "@/services/sql";

const Sidebar = () => {
  const trigger1 = () => getPoints();

  const trigger2 = () => getPoint2();

  return (
    <div class="absolute top-0 left-0 z-10 bg-white">
      <button onclick={trigger1}>getA</button>

      <button onclick={trigger2}>getB</button>
    </div>
  );
};

export default Sidebar;
