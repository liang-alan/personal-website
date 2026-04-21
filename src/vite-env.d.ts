/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_CONTENT_BASE_URL?: string;
  readonly VITE_BUTTONDOWN_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
