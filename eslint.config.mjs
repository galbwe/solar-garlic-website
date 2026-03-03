import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
  },
];

export default eslintConfig;
