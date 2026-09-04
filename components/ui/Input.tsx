'use client'

import React, { forwardRef } from 'react'

type InputVariant = 'input' | 'textarea'

interface BaseProps {
  label?: string
  variant?: InputVariant
  className?: string
  error?: string
}

type InputProps = BaseProps &
  (
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
  )

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, variant = 'input', className = '', error, ...props }, ref) => {
    const inputClasses = `w-full rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors mt-1 ${
      error
        ? 'border border-destructive focus:border-destructive'
        : 'border border-border focus:border-primary'
    } ${variant === 'textarea' ? 'px-4 py-3 resize-none' : 'h-12 px-4'} ${className}`

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}

        {variant === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={5}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={inputClasses}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            className={inputClasses}
          />
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
