"use client";

import type { Device } from "@/types";
import { Send } from "lucide-react";

interface DeviceCardProps {
	device: Device;
	onSelect: (device: Device) => void;
}

export default function DeviceCard({ device, onSelect }: DeviceCardProps) {
	return (
		<div
			className={`flex cursor-pointer items-center gap-4 py-4 transition-colors ${
				device.isOnline ? "hover:bg-gray-50" : "cursor-not-allowed opacity-40"
			}`}
			onClick={() => device.isOnline && onSelect(device)}
		>
			<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
				<span className="font-medium text-gray-600 text-sm">
					{device.name.split(" ")[0]?.[0]}
					{device.name.split(" ")[1]?.[0] || ""}
				</span>
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-medium text-gray-900 text-sm">
						{device.name}
					</span>
					{device.isOnline && (
						<div className="h-2 w-2 rounded-full bg-green-400" />
					)}
				</div>
				<p className="text-gray-500 text-xs">
					{device.isOnline ? device.distance : `Last seen ${device.lastSeen}`}
				</p>
			</div>
			{device.isOnline && <Send className="h-4 w-4 text-gray-300" />}
		</div>
	);
}
