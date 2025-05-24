"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { generateCode } from "@/lib/utils";
import type { Device, Transfer } from "@/types";
import type React from "react";
import { useEffect, useState } from "react";
import AuthenticationHeader from "./authentication-header";
import CodeDisplay from "./code-display";
import CodeSendDialog from "./code-send-dialog";
import DeviceCard from "./device-card";
import FileDisplay from "./file-display";
import ReceiveDialog from "./receive-dialog";
import SendDialog from "./send-dialog";
import TransferItem from "./transfer-item";

const mockDevices: Device[] = [
	{
		id: "1",
		name: "Sarah's iPhone",
		avatar: "/placeholder.svg?height=40&width=40",
		distance: "2m away",
		isOnline: true,
	},
	{
		id: "2",
		name: "Alex's MacBook",
		avatar: "/placeholder.svg?height=40&width=40",
		distance: "5m away",
		isOnline: true,
	},
	{
		id: "3",
		name: "Mike's iPad",
		avatar: "/placeholder.svg?height=40&width=40",
		distance: "8m away",
		isOnline: true,
	},
	{
		id: "4",
		name: "Emma's iPhone",
		distance: "12m away",
		isOnline: false,
		lastSeen: "5 min ago",
	},
];

export default function LuftPost() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userName, setUserName] = useState("");
	const [devices] = useState<Device[]>(mockDevices);
	const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
	const [transfers, setTransfers] = useState<Transfer[]>([]);
	const [activeTab, setActiveTab] = useState("send");
	const [message, setMessage] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [showSendDialog, setShowSendDialog] = useState(false);
	const [showReceiveDialog, setShowReceiveDialog] = useState(false);
	const [incomingTransfer, setIncomingTransfer] = useState<Transfer | null>(
		null,
	);
	const [myCode, setMyCode] = useState(generateCode());
	const [targetCode, setTargetCode] = useState("");
	const [showCodeDialog, setShowCodeDialog] = useState(false);

	// Reset tab when authentication changes
	useEffect(() => {
		if (!isAuthenticated) {
			setActiveTab("send");
		}
	}, [isAuthenticated]);

	// Simulate receiving transfers
	useEffect(() => {
		const interval = setInterval(() => {
			if (Math.random() > 0.97) {
				const transferTypes = ["file", "message"] as const;
				const randomType =
					transferTypes[Math.floor(Math.random() * transferTypes.length)];

				const newTransfer: Transfer = {
					id: Date.now().toString(),
					type: randomType ?? "file",
					content:
						randomType === "message"
							? "Hey! Check out this cool photo I took!"
							: "vacation-photo.jpg",
					fileName: randomType === "file" ? "vacation-photo.jpg" : undefined,
					fileSize: randomType === "file" ? "2.4 MB" : undefined,
					fileType: randomType === "file" ? "image/jpeg" : undefined,
					sender: isAuthenticated ? "Sarah's iPhone" : "Anonymous",
					receiver: isAuthenticated ? userName : "Anonymous",
					status: "pending",
					timestamp: new Date(),
					code: !isAuthenticated ? generateCode() : undefined,
				};

				setIncomingTransfer(newTransfer);
				setShowReceiveDialog(true);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isAuthenticated, userName]);

	const handleSendTransfer = () => {
		if (isAuthenticated && !selectedDevice) return;
		if (!isAuthenticated && !targetCode.trim()) return;

		const newTransfer: Transfer = {
			id: Date.now().toString(),
			type: selectedFile ? "file" : "message",
			content: selectedFile ? selectedFile.name : message,
			fileName: selectedFile?.name,
			fileSize: selectedFile
				? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`
				: undefined,
			fileType: selectedFile?.type,
			sender: isAuthenticated ? userName : "Anonymous",
			receiver:
				(isAuthenticated ? selectedDevice?.name : `Code: ${targetCode}`) ?? "",
			status: "pending",
			progress: 0,
			timestamp: new Date(),
			code: !isAuthenticated ? targetCode : undefined,
		};

		setTransfers((prev) => [...prev, newTransfer]);
		setShowSendDialog(false);
		setShowCodeDialog(false);
		setMessage("");
		setSelectedFile(null);
		setSelectedDevice(null);
		setTargetCode("");

		// Simulate transfer progress
		let progress = 0;
		const progressInterval = setInterval(() => {
			progress += Math.random() * 20;
			if (progress >= 100) {
				progress = 100;
				setTransfers((prev) =>
					prev.map((t) =>
						t.id === newTransfer.id
							? { ...t, status: "completed", progress: 100 }
							: t,
					),
				);
				clearInterval(progressInterval);
			} else {
				setTransfers((prev) =>
					prev.map((t) => (t.id === newTransfer.id ? { ...t, progress } : t)),
				);
			}
		}, 200);
	};

	const handleReceiveTransfer = (accept: boolean) => {
		if (!incomingTransfer) return;

		const updatedTransfer = {
			...incomingTransfer,
			status: accept ? ("accepted" as const) : ("declined" as const),
		};

		setTransfers((prev) => [...prev, updatedTransfer]);
		setShowReceiveDialog(false);
		setIncomingTransfer(null);

		if (accept) {
			let progress = 0;
			const progressInterval = setInterval(() => {
				progress += Math.random() * 15;
				if (progress >= 100) {
					progress = 100;
					setTransfers((prev) =>
						prev.map((t) =>
							t.id === updatedTransfer.id
								? { ...t, status: "completed", progress: 100 }
								: t,
						),
					);
					clearInterval(progressInterval);
				} else {
					setTransfers((prev) =>
						prev.map((t) =>
							t.id === updatedTransfer.id ? { ...t, progress } : t,
						),
					);
				}
			}, 300);
		}
	};

	const handleDeviceSelect = (device: Device) => {
		if (!device.isOnline) return;
		setSelectedDevice(device);
		setShowSendDialog(true);
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const copyCode = () => {
		navigator.clipboard.writeText(myCode);
	};

	const refreshCode = () => {
		setMyCode(generateCode());
	};

	const handleAnonymousSend = () => {
		setShowCodeDialog(true);
	};

	return (
		<div className="min-h-screen bg-white p-6">
			<div className="mx-auto max-w-2xl">
				{/* Header */}
				<div className="mb-12 text-center">
					<h1 className="mb-2 font-light text-2xl text-gray-900">AirShare</h1>
					<p className="text-gray-500 text-sm">Share with nearby devices</p>
				</div>

				<AuthenticationHeader
					isAuthenticated={isAuthenticated}
					userName={userName}
					onAuthChange={setIsAuthenticated}
					onUserNameChange={setUserName}
				/>

				{!isAuthenticated && (
					<CodeDisplay
						code={myCode}
						onCopy={copyCode}
						onRefresh={refreshCode}
					/>
				)}

				{/* Main Content */}
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="space-y-8"
				>
					<TabsList
						className={`grid w-full ${
							isAuthenticated ? "grid-cols-3" : "grid-cols-2"
						} bg-gray-50 p-1`}
					>
						<TabsTrigger
							value="send"
							className="data-[state=active]:bg-white data-[state=active]:shadow-none"
						>
							Send
						</TabsTrigger>
						{isAuthenticated && (
							<TabsTrigger
								value="devices"
								className="data-[state=active]:bg-white data-[state=active]:shadow-none"
							>
								Devices
							</TabsTrigger>
						)}
						<TabsTrigger
							value="activity"
							className="data-[state=active]:bg-white data-[state=active]:shadow-none"
						>
							Activity
						</TabsTrigger>
					</TabsList>

					<TabsContent value="send" className="space-y-6">
						<div className="space-y-4">
							<Tabs defaultValue="message" className="w-full">
								<TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1">
									<TabsTrigger
										value="message"
										className="data-[state=active]:bg-white data-[state=active]:shadow-none"
									>
										Message
									</TabsTrigger>
									<TabsTrigger
										value="file"
										className="data-[state=active]:bg-white data-[state=active]:shadow-none"
									>
										File
									</TabsTrigger>
								</TabsList>
								<TabsContent value="message" className="mt-6 space-y-4">
									<Textarea
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Type your message..."
										className="resize-none rounded-none border-0 border-gray-200 border-b px-0 focus-visible:border-gray-400 focus-visible:ring-0"
										rows={3}
									/>
									<Button
										onClick={
											isAuthenticated
												? () => setShowSendDialog(true)
												: handleAnonymousSend
										}
										disabled={!message.trim()}
										className="w-full bg-gray-900 text-white hover:bg-gray-800"
									>
										{isAuthenticated ? "Select Device" : "Send with Code"}
									</Button>
								</TabsContent>
								<TabsContent value="file" className="mt-6 space-y-4">
									<Input
										type="file"
										onChange={handleFileSelect}
										className="rounded-none border-0 border-gray-200 border-b px-0 focus-visible:border-gray-400 focus-visible:ring-0"
									/>
									{selectedFile && <FileDisplay file={selectedFile} />}
									<Button
										onClick={
											isAuthenticated
												? () => setShowSendDialog(true)
												: handleAnonymousSend
										}
										disabled={!selectedFile}
										className="w-full bg-gray-900 text-white hover:bg-gray-800"
									>
										{isAuthenticated ? "Select Device" : "Send with Code"}
									</Button>
								</TabsContent>
							</Tabs>
						</div>
					</TabsContent>

					{isAuthenticated && (
						<TabsContent value="devices" className="space-y-3">
							{devices.map((device) => (
								<DeviceCard
									key={device.id}
									device={device}
									onSelect={handleDeviceSelect}
								/>
							))}
						</TabsContent>
					)}

					<TabsContent value="activity" className="space-y-3">
						{transfers.length === 0 ? (
							<div className="py-12 text-center text-gray-400 text-sm">
								No activity yet
							</div>
						) : (
							<div className="space-y-3">
								{transfers.map((transfer) => (
									<TransferItem key={transfer.id} transfer={transfer} />
								))}
							</div>
						)}
					</TabsContent>
				</Tabs>

				<CodeSendDialog
					open={showCodeDialog}
					onOpenChange={setShowCodeDialog}
					targetCode={targetCode}
					onTargetCodeChange={setTargetCode}
					onSend={handleSendTransfer}
				/>

				<SendDialog
					open={showSendDialog}
					onOpenChange={setShowSendDialog}
					device={selectedDevice}
					selectedFile={selectedFile}
					message={message}
					onSend={handleSendTransfer}
				/>

				<ReceiveDialog
					open={showReceiveDialog}
					onOpenChange={setShowReceiveDialog}
					transfer={incomingTransfer}
					onAccept={() => handleReceiveTransfer(true)}
					onDecline={() => handleReceiveTransfer(false)}
				/>
			</div>
		</div>
	);
}
