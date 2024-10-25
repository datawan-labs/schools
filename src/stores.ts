import { createStore } from "solid-js/store";

const transformWorker = new Worker(
  new URL("./worker/transform-wkb-point.ts", import.meta.url),
  { type: "module" }
);

const [store] = createStore({
  worker: transformWorker,
});

export { store };
