/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_CONTENT_BASE_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_BUTTONDOWN_USERNAME?: string;
  readonly VITE_FOLLOW_IT_FORM_ACTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
