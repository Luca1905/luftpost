"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface AuthenticationHeaderProps {
	isAuthenticated: boolean;
	userName: string;
	onAuthChange: (authenticated: boolean) => void;
	onUserNameChange: (name: string) => void;
}

export default function AuthenticationHeader({
	isAuthenticated,
	userName,
	onAuthChange,
	onUserNameChange,
}: AuthenticationHeaderProps) {
	return (
		<>
			<div className="mb-8 flex items-center justify-between border-gray-100 border-b pb-4">
				<div className="flex items-center gap-3">
					<div className="h-2 w-2 rounded-full bg-gray-400" />
					<span className="text-gray-600 text-sm">
						{isAuthenticated ? userName || "Authenticated" : "Anonymous"}
					</span>
				</div>
				<Switch checked={isAuthenticated} onCheckedChange={onAuthChange} />
			</div>

			{isAuthenticated && !userName && (
				<div className="mb-8">
					<Input
						value={userName}
						onChange={(e) => onUserNameChange(e.target.value)}
						placeholder="Enter your name"
						className="rounded-none border-0 border-gray-200 border-b px-0 focus-visible:border-gray-400 focus-visible:ring-0"
					/>
				</div>
			)}
		</>
	);
}
