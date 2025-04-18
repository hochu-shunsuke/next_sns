import type React from "react"

interface ProfileFormSectionProps {
  label: string
  description?: string
  children: React.ReactNode
}

export function ProfileFormSection({ label, description, children }: ProfileFormSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{label}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
