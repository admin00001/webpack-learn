declare module '*.vue'{
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  const CONTENT: string
  export default CONTENT
}

declare module '*.png' {
  const CONTENT: string
  export default CONTENT
}

declare module '*.module.less' {
  const CONTENT: {
    [cssAttr: string]: string;
  };
  export default CONTENT;
}
