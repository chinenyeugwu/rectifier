import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Demo. All rights reserved.
          </p>
        </div>
      </footer>
  )
}
