import Link from 'next/link'
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="bg-secondary/10 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold glitch glitch-text" data-text="CODEMASTER">
            CODEMASTER
          </Link>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="#about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#videos" className="hover:text-primary transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}