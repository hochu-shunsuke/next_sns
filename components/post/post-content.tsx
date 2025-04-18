interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return <p className="text-sm">{content}</p>
}
