import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PostHeaderProps {
  author: string
  avatar: string
  timestamp: string
}

export function PostHeader({ author, avatar, timestamp }: PostHeaderProps) {
  return (
    <>
      <Link href={`/user/1`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={author} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="space-y-0.5">
        <Link href={`/user/1`}>
          <h3 className="text-sm font-semibold hover:underline">{author}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </>
  )
}
