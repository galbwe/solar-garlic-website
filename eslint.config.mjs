import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    // eslint-plugin-react uses context.getFilename() which was removed in ESLint v10.
    // Setting an explicit version bypasses auto-detection and avoids the crash.
    settings: {
      react: {
        version: "19",
      },
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
  },
];

export default eslintConfig;
