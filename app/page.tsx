
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Vote, Headphones, Share2, Download } from "lucide-react"
import Link from "next/link"
import Appbar from "./components/Appbar"
import Redirect from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Redirect></Redirect>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">VoteBeats</span>
        </Link>
       <Appbar></Appbar>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  VoteBeats: Where Fans Choose the Hits
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
                  Stream music and vote for your favorite tracks. Shape the playlist and discover new hits chosen by the community.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50"
                  href="dashboard"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 text-primary"
                  href="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Vote className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Fan-Powered Playlists</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Vote for your favorite tracks and shape the music landscape.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Headphones className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Unlimited Streaming</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Listen to millions of songs, curated by the community.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Share2 className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Social Sharing</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Share your favorite tracks and playlists with friends.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Top Voted Tracks</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-white">
                  <img
                    alt={`Album cover ${i}`}
                    className="aspect-square object-cover w-full rounded-md"
                    height="200"
                    src={`/placeholder.svg?height=200&width=200&text=Album+${i}`}
                    width="200"
                  />
                  <h3 className="font-semibold">Track Title {i}</h3>
                  <p className="text-sm text-zinc-500">Artist Name</p>
                  <Button variant="outline" size="sm">
                    Vote Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Download className="h-12 w-12" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Download VoteBeats Now</h2>
              <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start streaming and voting for your favorite music. Available on iOS and Android.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  App Store
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 text-primary"
                  href="#"
                >
                  Google Play
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2023 VoteBeats Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}