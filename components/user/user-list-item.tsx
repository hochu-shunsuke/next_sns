import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FollowButton } from "@/components/user/follow-button"

interface UserListItemProps {
  user: {
    id: string
    name: string
    username: string
    avatar: string
    bio: string
    isFollowing: boolean
  }
}

export function UserListItem({ user }: UserListItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href={`/user/${user.id}`} className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.username}</p>
          <p className="text-sm line-clamp-1">{user.bio}</p>
        </div>
      </Link>
      <FollowButton userId={user.id} initialIsFollowing={user.isFollowing} />
    </div>
  )
}
