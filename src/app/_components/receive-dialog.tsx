"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getFileIcon } from "@/lib/ui-utils";
import type { Transfer } from "@/types";
import { File, MessageSquare } from "lucide-react";

interface ReceiveDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	transfer: Transfer | null;
	onAccept: () => void;
	onDecline: () => void;
}

export default function ReceiveDialog({
	open,
	onOpenChange,
	transfer,
	onAccept,
	onDecline,
}: ReceiveDialogProps) {
	if (!transfer) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-light text-lg">
						Incoming from {transfer.sender}
						{transfer.code && ` (Code: ${transfer.code})`}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-6">
					<div className="border-gray-100 border-b py-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
								{transfer.type === "file" ? (
									transfer.fileType ? (
										getFileIcon(transfer.fileType)
									) : (
										<File className="h-4 w-4 text-gray-500" />
									)
								) : (
									<MessageSquare className="h-4 w-4 text-gray-500" />
								)}
							</div>
							<div>
								<p className="font-medium text-gray-900 text-sm">
									{transfer.type === "file" ? transfer.fileName : "Message"}
								</p>
								{transfer.fileSize && (
									<p className="text-gray-500 text-xs">{transfer.fileSize}</p>
								)}
								{transfer.type === "message" && (
									<p className="mt-1 text-gray-600 text-xs">
										{transfer.content}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="flex gap-3">
						<Button
							variant="outline"
							onClick={onDecline}
							className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
						>
							Decline
						</Button>
						<Button
							onClick={onAccept}
							className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
						>
							Accept
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
