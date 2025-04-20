import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export default function PostCard({ post }: { post: any }) {
    const timeZone = 'Asia/Tokyo'
    const zonedDate = toZonedTime(new Date(post.created_at), timeZone)
    const formatted = format(zonedDate, 'yyyy/MM/dd HH:mm')

    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <span>{formatted}</span>
        </div>
    )
}
