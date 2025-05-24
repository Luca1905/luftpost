import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { HydrateClient, api } from "@/trpc/server";
import LuftPost from "./_components/luftpost";

export default async function Home() {
	return (
		<HydrateClient>
			<LuftPost />
		</HydrateClient>
	);
}
