import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <header className="w-full border-b border-accent bg-background text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-lg font-bold text-primary">
                    Kappa Tracker
                </Link>
                <nav className="flex gap-4 items-center">
                    <Link href="/about" className="hover:text-primary">About</Link>
                    <Link href="/support" className="hover:text-primary">Support</Link>
                    <Link href="/contact" className="hover:text-primary">Contact</Link>
                    <Button>
                        Sign In
                    </Button>
                </nav>
            </div>
        </header>
    )
}