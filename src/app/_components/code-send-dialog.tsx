"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CodeSendDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	targetCode: string;
	onTargetCodeChange: (code: string) => void;
	onSend: () => void;
}

export default function CodeSendDialog({
	open,
	onOpenChange,
	targetCode,
	onTargetCodeChange,
	onSend,
}: CodeSendDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-light text-lg">
						Enter recipient code
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-6">
					<Input
						value={targetCode}
						onChange={(e) =>
							onTargetCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))
						}
						placeholder="000000"
						className="rounded-none border-0 border-gray-200 border-b px-0 text-center font-mono text-2xl tracking-wider focus-visible:border-gray-400 focus-visible:ring-0"
						maxLength={6}
					/>
					<Button
						onClick={onSend}
						disabled={targetCode.length !== 6}
						className="w-full bg-gray-900 text-white hover:bg-gray-800"
					>
						Send
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
