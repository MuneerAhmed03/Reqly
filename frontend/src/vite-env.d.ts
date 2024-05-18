/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REQLY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
