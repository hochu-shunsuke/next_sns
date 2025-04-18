import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Link2, MapPin } from "lucide-react"
import { FollowButton } from "@/components/user/follow-button"

interface UserProfileHeaderProps {
  profile: {
    id: string
    name: string
    username: string
    avatar: string
    bio: string
    location: string
    website: string
    joinedDate: string
    following: number
    followers: number
    isFollowing: boolean
  }
}

export function UserProfileHeader({ profile }: UserProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"></div>
      <div className="relative px-4 pb-4 pt-0">
        <div className="flex justify-between">
          <Avatar className="absolute -top-12 h-24 w-24 border-4 border-background">
            <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-auto mt-2">
            <FollowButton userId={profile.id} initialIsFollowing={profile.isFollowing} />
          </div>
        </div>

        <div className="mt-12 space-y-2">
          <div>
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">{profile.username}</p>
          </div>

          <p className="text-sm">{profile.bio}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {profile.location}
            </div>
            <div className="flex items-center">
              <Link2 className="mr-1 h-4 w-4" />
              <a href={profile.website} className="text-primary hover:underline">
                {profile.website.replace("https://", "")}
              </a>
            </div>
            <div className="flex items-center">
              <CalendarDays className="mr-1 h-4 w-4" />
              {profile.joinedDate}
            </div>
          </div>

          <div className="flex gap-4 pt-2 text-sm">
            <Link href={`/user/${profile.id}/following`} className="hover:underline">
              <span className="font-bold">{profile.following}</span>{" "}
              <span className="text-muted-foreground">フォロー中</span>
            </Link>
            <Link href={`/user/${profile.id}/followers`} className="hover:underline">
              <span className="font-bold">{profile.followers}</span>{" "}
              <span className="text-muted-foreground">フォロワー</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
