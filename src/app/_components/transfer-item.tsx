"use client";

import { getFileIcon } from "@/lib/ui-utils";
import type { Transfer } from "@/types";
import { File, MessageSquare } from "lucide-react";

interface TransferItemProps {
	transfer: Transfer;
}

export default function TransferItem({ transfer }: TransferItemProps) {
	return (
		<div className="flex items-center gap-4 py-3">
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
				{transfer.type === "file" ? (
					transfer.fileType ? (
						getFileIcon(transfer.fileType)
					) : (
						<File className="h-3 w-3 text-gray-500" />
					)
				) : (
					<MessageSquare className="h-3 w-3 text-gray-500" />
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="mb-1 flex items-center gap-2">
					<span className="truncate font-medium text-gray-900 text-sm">
						{transfer.type === "file" ? transfer.fileName : "Message"}
					</span>
					<div
						className={`h-2 w-2 rounded-full ${
							transfer.status === "completed"
								? "bg-green-400"
								: transfer.status === "declined"
									? "bg-red-400"
									: "bg-yellow-400"
						}`}
					/>
				</div>
				<p className="truncate text-gray-500 text-xs">
					{transfer.sender} → {transfer.receiver}
					{transfer.code && ` (Code: ${transfer.code})`}
				</p>
				{transfer.status === "accepted" &&
					transfer.progress !== undefined &&
					transfer.progress < 100 && (
						<div className="mt-2 h-1 w-full rounded-full bg-gray-100">
							<div
								className="h-1 rounded-full bg-gray-400 transition-all duration-300"
								style={{ width: `${transfer.progress}%` }}
							/>
						</div>
					)}
			</div>
		</div>
	);
}
