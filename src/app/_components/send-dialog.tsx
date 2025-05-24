"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getFileIcon } from "@/lib/ui-utils";
import { formatFileSize } from "@/lib/utils";
import type { Device } from "@/types";
import { MessageSquare } from "lucide-react";

interface SendDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	device: Device | null;
	selectedFile: File | null;
	message: string;
	onSend: () => void;
}

export default function SendDialog({
	open,
	onOpenChange,
	device,
	selectedFile,
	message,
	onSend,
}: SendDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-light text-lg">
						Send to {device?.name}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-6">
					<div className="border-gray-100 border-b py-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
								{selectedFile ? (
									getFileIcon(selectedFile.type)
								) : (
									<MessageSquare className="h-4 w-4 text-gray-500" />
								)}
							</div>
							<div>
								<p className="font-medium text-gray-900 text-sm">
									{selectedFile ? selectedFile.name : "Message"}
								</p>
								{selectedFile && (
									<p className="text-gray-500 text-xs">
										{formatFileSize(selectedFile.size)}
									</p>
								)}
								{!selectedFile && message && (
									<p className="mt-1 text-gray-600 text-xs">
										{message.slice(0, 50)}...
									</p>
								)}
							</div>
						</div>
					</div>
					<Button
						onClick={onSend}
						className="w-full bg-gray-900 text-white hover:bg-gray-800"
					>
						Send
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
