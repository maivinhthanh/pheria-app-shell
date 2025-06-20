'use client'

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'http://localhost:4173/remote-app.js'
    script.type = 'module'
    document.head.appendChild(script)
  }, [])

  return (
    <main>
      <h1>Host App</h1>
      <remote-app></remote-app>
    </main>
  )
}
