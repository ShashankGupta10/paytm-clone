export function Card({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}): JSX.Element {
  return (
    <div className="border mt-4 p-4 w-full rounded-xl flex flex-col gap-4">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  )
}
