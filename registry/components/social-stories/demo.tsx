
import { useMemo } from "react"
import { SocialStories, type Story } from "./social-stories"

export default function SocialStoriesDemo() {
    const stories = useMemo<Story[]>(
        () => [
            {
                id: "1",
                platform: "instagram",
                mediaUrl:
                    "https://res.cloudinary.com/dap0u41dz/image/upload/v1767300459/Wallpaper_Red_Dead_Redemption_2_dytm9u.jpg",
                linkUrl: "https://instagram.com",
                caption: "",
                duration: 5,
            },
            {
                id: "2",
                platform: "instagram",
                mediaUrl:
                    "https://res.cloudinary.com/dap0u41dz/image/upload/v1767300743/download_4_xpme3u.jpg",
                linkUrl: "https://instagram.com",
                caption: "",
                duration: 7,
            },
            {
                id: "3",
                platform: "instagram",
                mediaUrl:
                    "https://res.cloudinary.com/dap0u41dz/video/upload/v1767302430/f12bda85fa34639b0168d300ea8e9515_ywmy8p.mp4",
                linkUrl: "https://instagram.com",
                caption: "",
                duration: 6,
            },
        ],
        []
    )

    const profile = useMemo(
        () => ({
            name: "Abhishek Singh",
            avatarUrl:
                "https://res.cloudinary.com/dap0u41dz/image/upload/v1766771167/file_00000000d51472078b7e2f9d883a6674_majhmb.jpg",
        }),
        []
    )

    return (
        <div className="w-full h-150 flex items-center justify-center bg-transparent antialiased relative">
            <SocialStories stories={stories} profile={profile} embedded={true} />
        </div>
    )
}
