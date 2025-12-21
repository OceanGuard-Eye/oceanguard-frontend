type NotiCardProps = {
  leftImage: string
  rightImage: string
  altLeft?: string
  altRight?: string
}

export default function NotiCard({
  leftImage,
  rightImage,
  altLeft = "left",
  altRight = "right",
}: NotiCardProps) {
  return (
    <div
      className="
        w-full
        bg-white
        rounded-2xl
        border border-gray-200
        overflow-hidden
      "
    >
      {/* สูงขึ้น 2 เท่าจากเดิม (104 -> 208) */}
      <div className="h-[208px] p-3">
        <div className="h-full flex items-center gap-3 overflow-x-auto">
          <img
            src={leftImage}
            alt={altLeft}
            className="h-full w-auto object-contain rounded-xl bg-gray-100"
            draggable={false}
          />
          <img
            src={rightImage}
            alt={altRight}
            className="h-full w-auto object-contain rounded-xl bg-gray-100"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
