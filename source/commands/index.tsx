import React, { useState } from "react"
import { Text, Box, useInput, useApp } from "ink"
import { z } from "zod"
import { option } from "pastel"
import { clearScreen } from "ansi-escapes"
import process from "node:process"
import Gradient from "ink-gradient"
import BigText from "ink-big-text"

interface Props {
	options: z.infer<typeof options>
}

export const options = z.object({
	raw: z
		.boolean()
		.default(false)
		.describe(
			option({
				description: "Enable raw keyboard input mode"
			})
		)
})

export default function Index({ options }: Props) {
	// Track all key presses in a Map
	const [keyPresses, setKeyPresses] = useState<Map<string, number>>(new Map())
	const [showExitingMessage, setShowExitingMessage] = useState(false)
	const { exit } = useApp()

	// Clear both the screen and the key counts
	const clearAll = () => {
		process.stdout.write(clearScreen)
		setKeyPresses(new Map())
	}

	useInput(
		(input, key) => {
			if (!options.raw) return

			if (input === "q") {
				if (showExitingMessage) {
					exit()
					return
				}
				setShowExitingMessage(true)
				return
			}

			if (input === "c") {
				clearAll()
				return
			}

			setKeyPresses((prev) => {
				const next = new Map(prev)

				// Handle special keys only
				if (key.return) next.set("return", (prev.get("return") || 0) + 1)
				else if (key.escape) next.set("escape", (prev.get("escape") || 0) + 1)
				else if (key.leftArrow) next.set("left", (prev.get("left") || 0) + 1)
				else if (key.rightArrow) next.set("right", (prev.get("right") || 0) + 1)
				else if (key.upArrow) next.set("up", (prev.get("up") || 0) + 1)
				else if (key.downArrow) next.set("down", (prev.get("down") || 0) + 1)
				// Handle space separately
				else if (input === " ") next.set("space", (prev.get("space") || 0) + 1)
				// Handle regular character input only if not a special key
				else if (input && !key.meta && !key.ctrl) {
					next.set(input, (prev.get(input) || 0) + 1)
				}

				return next
			})
		},
		{ isActive: options.raw }
	)

	if (!options.raw) {
		return <Text>Run with --raw flag to start</Text>
	}

	return (
		<Box flexDirection="column">
			<Gradient name="rainbow">
				<BigText text="Press Any Key" />
			</Gradient>
			<Text>Press any key to see count (q to quit, c to clear)</Text>
			<Box flexDirection="column">
				{Array.from(keyPresses.entries()).map(([key, count]) => (
					<Text key={key}>
						{key === " " ? "SPACE" : key.toUpperCase()}: {count}
					</Text>
				))}
				{showExitingMessage && <Text>Press q again to quit</Text>}
			</Box>
		</Box>
	)
}
