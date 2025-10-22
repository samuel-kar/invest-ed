import React from 'react'

interface CardProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  onClick?: () => void
}

export default function Card({
  className = '',
  style,
  children,
  onClick,
}: CardProps) {
  return (
    <div
      className={`p-4 rounded-lg ${className}`}
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
