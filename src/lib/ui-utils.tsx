import { File, ImageIcon, Music, Video } from "lucide-react";

export const getFileIcon = (fileType: string) => {
	if (fileType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
	if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />;
	if (fileType.startsWith("audio/")) return <Music className="h-4 w-4" />;
	return <File className="h-4 w-4" />;
};
