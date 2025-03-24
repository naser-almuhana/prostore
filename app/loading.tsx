import { Loader2Icon } from "lucide-react" // Import the spinner icon from Lucide

export default function LoadingPage() {
  return (
    <div className="bg-background flex h-screen w-screen items-center justify-center">
      {/* Spinner Icon */}
      <Loader2Icon className="text-primary h-16 w-16 animate-spin" />
    </div>
  )
}
