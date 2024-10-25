import { createStore } from "solid-js/store";

/**
 * we save worker to store so we can use it anywhere
 */
const [worker] = createStore({
  point: new Worker(new URL("./services/worker-point.ts", import.meta.url), {
    type: "module",
  }),
});

export { worker };
