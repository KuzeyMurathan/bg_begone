"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, Download, X, Loader2 } from "lucide-react"

export function BackgroundRemover() {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImage(ev.target?.result as string)
      setResult(null)
    }
    reader.readAsDataURL(file)
  }, [])

  const removeBackground = useCallback(async () => {
    if (!image || !canvasRef.current) return
    setLoading(true)

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext("2d")!
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const bgR = data[0],
        bgG = data[1],
        bgB = data[2]
      const tolerance = 30

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2]
        if (Math.abs(r - bgR) < tolerance && Math.abs(g - bgG) < tolerance && Math.abs(b - bgB) < tolerance) {
          data[i + 3] = 0
        }
      }

      ctx.putImageData(imageData, 0, 0)
      setResult(canvas.toDataURL("image/png"))
      setLoading(false)
    }
    img.src = image
  }, [image])

  const download = useCallback(() => {
    if (!result) return
    const a = document.createElement("a")
    a.href = result
    a.download = "bg_removed.png"
    a.click()
  }, [result])

  const reset = useCallback(() => {
    setImage(null)
    setResult(null)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload" />

      {!image ? (
        <label
          htmlFor="upload"
          className="border-2 border-dashed border-foreground h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary transition-colors"
        >
          <Upload className="w-8 h-8 mb-2" strokeWidth={1} />
          <span className="text-sm uppercase tracking-wider">DROP_IMAGE</span>
        </label>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-foreground p-2">
              <p className="text-xs uppercase mb-2 border-b border-foreground pb-1">INPUT</p>
              <img src={image || "/placeholder.svg"} alt="Input" className="w-full object-contain max-h-64" />
            </div>
            <div
              className="border-2 border-foreground p-2 relative"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%23ccc'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23ccc'/%3E%3C/svg%3E\")",
              }}
            >
              <p className="text-xs uppercase mb-2 border-b border-foreground pb-1 bg-background -mx-2 -mt-2 px-2 pt-2">
                OUTPUT
              </p>
              {result ? (
                <img src={result || "/placeholder.svg"} alt="Output" className="w-full object-contain max-h-64" />
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-xs">
                  AWAITING_PROCESS
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={removeBackground}
              disabled={loading}
              className="flex-1 border-2 border-foreground bg-foreground text-background py-3 uppercase tracking-wider text-sm hover:bg-background hover:text-foreground transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "PROCESSING" : "EXECUTE"}
            </button>
            {result && (
              <button
                onClick={download}
                className="border-2 border-foreground px-4 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={reset}
              className="border-2 border-foreground px-4 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <footer className="border-2 border-foreground p-3 text-xs uppercase tracking-wider text-muted-foreground">
        <span>STATUS: {loading ? "RUNNING" : "IDLE"}</span>
        <span className="mx-2">|</span>
        <span>MODE: CLIENT_SIDE</span>
      </footer>
    </div>
  )
}
