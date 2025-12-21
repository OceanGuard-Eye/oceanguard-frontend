import { type ReactNode, useId, useState } from "react"

type NotiBoxProps = {
  text: ReactNode
  icon: ReactNode
  card: ReactNode
  defaultOpen?: boolean
}

export default function NotiBox({
  text,
  icon,
  card,
  defaultOpen = false,
}: NotiBoxProps) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <div className="w-3/4">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="
          w-full
          bg-white
          rounded-2xl
          border border-gray-200
          px-4
          py-3
          min-h-12
          flex items-center justify-between
          text-left
          transition
          hover:bg-gray-50
        "
      >
        <span className="text-gray-700 font-medium truncate pr-3">
          {text}
        </span>

        <span className="shrink-0 flex items-center justify-center">
          {icon}
        </span>
      </button>

      <div
        id={contentId}
        className={[
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">{card}</div>
      </div>
    </div>
  )
}
