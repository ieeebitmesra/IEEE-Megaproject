declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module '*.sql?raw' {
  const content: string
  export default content
}

declare module '*.css' {
  const classes: Record<string, string>
  export default classes
}
