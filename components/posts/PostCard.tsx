import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export default function PostCard({ post }: { post: any }) {
    const timeZone = 'Asia/Tokyo'
    const zonedDate = toZonedTime(new Date(post.created_at), timeZone)
    const formatted = format(zonedDate, 'yyyy/MM/dd HH:mm')

    return (
        <div>
            <img src={post.profile.icon_color} alt="icon" />
            @{post.profile.username}
            <h3>{post.profile.display_name}</h3>
            <p>{post.content}</p>
            <span>{formatted}</span>
        </div>
    )
}
