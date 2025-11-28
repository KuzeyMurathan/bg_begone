import { BackgroundRemover } from "@/components/background-remover"

export default function Page() {
  return (
    <main className="min-h-screen p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="border-2 border-foreground p-4 mb-8">
          <h1 className="text-2xl uppercase tracking-widest">BG_BEGONE</h1>
          <p className="text-sm text-muted-foreground mt-1">LOCAL PROCESSING for PRIVACY and NO BS</p>
          <p className="text-sm text-muted-foreground mt-1"> - - - - - - - - - -</p>
          <p className="text-sm text-muted-foreground mt-1">Why?</p>
          <p className="text-sm text-muted-foreground mt-1">Because i needed an app that wont cost me money and still give good results.</p>
          <p className="text-sm text-muted-foreground mt-1">And i dont want to pay for a service that i can do on my own. And better at that...</p>
        </header>
        <BackgroundRemover />
      </div>
    </main>
  )
}

//cool codebase right? yeah its shit