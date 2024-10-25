import "@/services/setup";
import { createSignal } from "solid-js";
import { getPoint } from "@/services/trigger";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";

const defaultQuery = `SELECT 
  ST_AsWKB(location) as location 
FROM 
  final.parquet 
WHERE 
  location_status = 'valid' LIMIT 10000;`;

const PointExecutor = () => {
  const [signal, setSignal] = createSignal(defaultQuery);

  const run = () => getPoint(signal());

  return (
    <div class="flex w-full flex-col gap-4">
      <CodeEditor value={signal()} onChange={setSignal} />
      <Button onclick={run} class="uppercase">
        execute
      </Button>
    </div>
  );
};

const Executor = () => {
  return <PointExecutor />;
};

export default Executor;
