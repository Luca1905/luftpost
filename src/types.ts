export interface Device {
	id: string;
	name: string;
	avatar?: string;
	distance: string;
	isOnline: boolean;
	lastSeen?: string;
}

export interface Transfer {
	id: string;
	type: "file" | "message";
	content: string;
	fileName?: string;
	fileSize?: string;
	fileType?: string;
	sender: string;
	receiver: string;
	status: "pending" | "accepted" | "declined" | "completed";
	progress?: number;
	timestamp: Date;
	code?: string;
}
