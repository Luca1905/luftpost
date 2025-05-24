"use client";

import { getFileIcon } from "@/lib/ui-utils";
import { formatFileSize } from "@/lib/utils";

interface FileDisplayProps {
	file: File;
}

export default function FileDisplay({ file }: FileDisplayProps) {
	return (
		<div className="border-gray-100 border-b py-3">
			<div className="flex items-center gap-3">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
					{getFileIcon(file.type)}
				</div>
				<div>
					<span className="font-medium text-gray-900 text-sm">{file.name}</span>
					<p className="text-gray-500 text-xs">{formatFileSize(file.size)}</p>
				</div>
			</div>
		</div>
	);
}
