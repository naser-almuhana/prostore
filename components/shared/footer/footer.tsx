import { APP_NAME } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="flex-center p-5">
        {currentYear} {APP_NAME}. All Rights Reserved
      </div>
    </footer>
  )
}
