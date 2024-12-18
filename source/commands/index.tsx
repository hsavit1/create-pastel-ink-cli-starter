import React from "react"
import { Text } from "ink"
import { z } from "zod"

export const options = z.object({
	name: z.string().default("Stranger").describe("Name")
})

type Props = {
	readonly options: z.infer<typeof options>
}

export default function Index({ options }: Props) {
	return (
		<Text>
			Hello, <Text color="green">{options.name}</Text>
		</Text>
	)
}
