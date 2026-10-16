'use client'
import { useEffect } from 'react'
import { CFG } from '../cinema.config'
import { MARKUP } from '../lib/markup'
import { initCinema } from '../lib/cinema'

export default function Page() {
  useEffect(() => { initCinema(CFG) }, [])
  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
}
