import "@/services/setup";
import { getPoint } from "@/services/trigger";
import { Button } from "@/components/ui/button";
import { createSignal, onMount } from "solid-js";
import { CodeEditor } from "@/components/ui/code-editor";
import { ShellWrapper } from "./shell/wrapper";

const defaultQuery = `SELECT 
  ST_AsWKB(location) as location 
FROM 
  final.parquet 
WHERE 
  location_status = 'valid' 
LIMIT 200;`;

const PointExecutor = () => {
  const [signal, setSignal] = createSignal(defaultQuery);

  const run = () => getPoint(signal());

  onMount(() => run());

  return (
    <div class="flex w-full flex-col gap-4">
      <CodeEditor value={signal()} onChange={setSignal} />
      <Button onclick={run} class="uppercase">
        execute
      </Button>
      <ShellWrapper />
    </div>
  );
};

const Executor = () => {
  return <PointExecutor />;
};

export default Executor;
