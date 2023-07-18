
interface Props {
    params: {
        videoId: string;
    }
}

export default function userProfilePage({params}: Props) {
    return (
        <div>
            <h1>User Profile</h1>
            <p>{params.videoId}</p>
        </div>
    )
}