"use client"

import { useEffect, useState } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // クライアントサイドでのみ実行
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    // 初期チェック
    checkIfMobile()

    // リサイズイベントのリスナー
    window.addEventListener("resize", checkIfMobile)

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}
