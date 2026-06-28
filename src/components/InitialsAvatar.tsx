interface InitialsAvatarProps {
  initials: string
  color: string
  size?: 'sm' | 'md'
}

export function InitialsAvatar({ initials, color, size = 'sm' }: InitialsAvatarProps) {
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}
