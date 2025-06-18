'use client'

import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  href: string
} & LinkProps

export function NavItem({ children, className, href, ...rest }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        className,
        pathname === href && 'underline underline-offset-4 decoration-2 decoration-primary',
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
