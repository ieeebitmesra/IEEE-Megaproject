import type { HTMLAttributes, ReactNode } from 'react'

export const mdxComponents = {
  h1: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-8 text-foreground"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4 mt-10 text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-8 text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-6 text-foreground"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 not-first:mt-6 text-foreground/90" {...props}>
      {children}
    </p>
  ),
  ul: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-6 ml-6 list-disc [&>li]:mt-2 text-foreground/90"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 ml-6 list-decimal [&>li]:mt-2 text-foreground/90"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground/90" {...props}>
      {children}
    </li>
  ),
  code: ({
    children,
    className,
    ...props
  }: {
    children?: ReactNode
    className?: string
  } & HTMLAttributes<HTMLElement>) => {
    const isInline = !className

    // Inline code styling (e.g., `variableName`)
    if (isInline) {
      return (
        <code
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono  font-semibold text-foreground border border-border text-sm in-[h1]:text-4xl in-[h2]:text-3xl in-[h3]:text-2xl in-[h4]:text-xl"
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <code
        className={`${className} text-sm font-mono leading-relaxed`}
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-foreground"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/20 py-1 pr-4 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted/50 text-foreground" {...props}>
      {children}
    </thead>
  ),
  tbody: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="[&_tr:last-child]:border-0" {...props}>
      {children}
    </tbody>
  ),
  tr: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-foreground"
      {...props}
    >
      {children}
    </td>
  ),
  a: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  strong: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
    <em className="italic text-foreground/90" {...props}>
      {children}
    </em>
  ),
}
