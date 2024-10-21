import { Config } from "tailwindcss";
import { datawanUIPreset } from "./src/styles/datawan-ui";

const config: Config = {
  presets: [datawanUIPreset],
  content: ["src/routes/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
};

export default config;
