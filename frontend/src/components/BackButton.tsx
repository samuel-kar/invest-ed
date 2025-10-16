import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  to: string
  label?: string
}

export default function BackButton({ to, label = 'Back' }: BackButtonProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 mb-4 text-sm font-medium transition-colors duration-200 hover:opacity-80"
      style={{ color: 'var(--text-secondary)' }}
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </Link>
  )
}
