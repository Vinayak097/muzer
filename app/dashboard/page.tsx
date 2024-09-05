"use client"
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, RefreshCcw } from 'lucide-react'
import Appbar from '../components/Appbar'
import  axios from 'axios'
import { useSession } from 'next-auth/react'
type Song = {
  id: string;
  title: string;
  videoId: string;
  votes: number;
}
enum StreamType{
    Youtube="YouTube",
    Spotify="Spotify"
}
type Upvote={

}
interface Video {
    "id": string,
    "type": string,
    "url": string,
    "extractedId": string,
    "title": string,
    "smallImg": string,
    "bigImg": string,
    "active": boolean,
    "userId": string,
    "upvotes": number,
    "haveUpvoted": boolean
}

export default function Component() {
    const session=useSession();
    
    const creatorId=session?.data?.user.id
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
    async function refreshSchema() {
       
        const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
            credentials: "include"
        });   
        console.log(res)
    }
    console.log("not rping s ",session.data?.user.id)
    useEffect(()=>{
        const creatorId=session?.data?.user.id;
             
        const interval=setInterval(() => {
            
            refreshSchema();
        }, 10*1000);
    },[])
    
  const [videoLink, setVideoLink] = useState('')
  const [currentSong, setCurrentSong] = useState<Song>({
    id: '0',
    title: 'Currently Playing: Awesome Song',
    videoId: 'dQw4w9WgXcQ', // Example: Rick Astley - Never Gonna Give You Up
    votes: 10
  })
  const [songs, setSongs] = useState<Song[]>([
    { id: '1', title: 'Catchy Tune', videoId: 'kJQP7kiw5Fk', votes: 5 }, // Example: Luis Fonsi - Despacito
    { id: '2', title: 'Mellow Melody', videoId: 'JGwWNGJdvx8', votes: 3 }, // Example: Ed Sheeran - Shape of You
    { id: '3', title: 'Upbeat Rhythm', videoId: 'OPf0YbXqDm0', votes: 7 }, // Example: Mark Ronson - Uptown Funk
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = extractVideoId(videoLink)
    if (videoId) {
      const newSong: Song = {
        id: Date.now().toString(),
        title: 'New Submitted Song', // In a real app, you'd fetch the actual title
        videoId: videoId,
        votes: 0
      }
      setSongs([...songs, newSong])
      setVideoLink('')
    } else {
      alert('Invalid YouTube URL')
    }
  }

  const handleVote = (id: string, increment: number) => {
    setSongs(songs.map(song => 
      song.id === id ? { ...song, votes: song.votes + increment } : song
    ).sort((a, b) => b.votes - a.votes))
  }

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 text-white p-8">
        <Appbar></Appbar>
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-300">Stream Song Voter</h1>
        
        {/* Currently Playing Section */}
        <Card className="mb-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Play className="mr-2" /> Now Playing
            </h2>
            <div className="flex items-center gap-4">
              <img 
                src={`https://img.youtube.com/vi/${currentSong.videoId}/0.jpg`} 
                alt={currentSong.title} 
                className="w-40 h-auto rounded-md"
              />
              <div>
                <h3 className="text-xl font-medium">{currentSong.title}</h3>
                <p className="text-sm opacity-80">Votes: {currentSong.votes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Submit New Song Section */}
        <form onSubmit={handleSubmit} className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-yellow-300">Add a Song</h2>
          <div className="flex gap-2">
            <Input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Paste YouTube video link here"
              className="flex-grow bg-white/20 text-white placeholder-white/50 border-white/30"
            />
            <Button type="submit" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300">Submit</Button>
          </div>
          {videoLink && extractVideoId(videoLink) && (
            <div className="mt-2">
              <img 
                src={`https://img.youtube.com/vi/${extractVideoId(videoLink)}/0.jpg`} 
                alt="Video thumbnail" 
                className="w-full max-w-[320px] h-auto rounded-md"
              />
            </div>
          )}
        </form>

        {/* Upcoming Songs Queue */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">Upcoming Songs</h2>
          {songs.map((song) => (
            <Card key={song.id} className="bg-white/20 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <img 
                  src={`https://img.youtube.com/vi/${song.videoId}/0.jpg`} 
                  alt={song.title} 
                  className="w-24 h-auto rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-lg">{song.title}</h3>
                  <p className="text-sm opacity-80">Votes: {song.votes}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleVote(song.id, 1)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white border-none"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleVote(song.id, -1)}
                    className="bg-orange-500 hover:bg-orange-600 text-white border-none"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}