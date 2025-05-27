// AI-Hint Component: [Vite Types] [Declaraciones de tipos] [Environment variables, asset imports, CSS modules]
/// <reference types="vite/client" />

// Environment variables interface
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_MCP_ENABLED: string
  readonly VITE_APP_VERSION: string
  readonly VITE_NODE_ENV: string
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Window object extensions
declare global {
  interface Window {
    ENV: {
      API_URL: string
      MCP_ENABLED: string
      APP_VERSION: string
    }
  }
}

// CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// Asset imports
declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react'
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>
  const content: string
  
  export { ReactComponent }
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.ico' {
  const content: string
  export default content
}

declare module '*.bmp' {
  const content: string
  export default content
}

// JSON imports
declare module '*.json' {
  const value: any
  export default value
}

// Web Workers
declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor()
  }
  export default WebpackWorker
}

export {} 