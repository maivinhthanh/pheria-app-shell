// types/custom-elements.d.ts
import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'remote-app': any//React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
