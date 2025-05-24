"use client";

import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";

interface CodeDisplayProps {
	code: string;
	onCopy: () => void;
	onRefresh: () => void;
}

export default function CodeDisplay({
	code,
	onCopy,
	onRefresh,
}: CodeDisplayProps) {
	return (
		<div className="mb-8 rounded-lg bg-gray-50 p-6">
			<div className="text-center">
				<p className="mb-4 text-gray-600 text-sm">Your receiving code</p>
				<div className="mb-4 flex items-center justify-center gap-3">
					<span
						className="font-light font-mono text-3xl text-gray-900 tracking-wider"
						suppressHydrationWarning
					>
						{code}
					</span>
					<div className="flex gap-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={onCopy}
							className="h-8 w-8 p-0"
						>
							<Copy className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={onRefresh}
							className="h-8 w-8 p-0"
						>
							<RefreshCw className="h-4 w-4" />
						</Button>
					</div>
				</div>
				<p className="text-gray-500 text-xs">
					Share this code to receive files
				</p>
			</div>
		</div>
	);
}
