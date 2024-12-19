import React, { useState } from "react"
import { Text, Box, useInput, useApp } from "ink"
import { z } from "zod"
import { option } from "pastel"

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

export type Props = {
	options: z.infer<typeof options>
}

export default function Index({ options }: Props) {
	// Create a state to track key press counts
	const [keyPresses, setKeyPresses] = useState({
		right: 0,
		left: 0,
		up: 0,
		down: 0,
		return: 0,
		escape: 0,
		q: 0
	})

	const [showExitingMessage, setShowExitingMessage] = useState(false)

	const { exit } = useApp()

	// Add clear function to reset all counts
	const clearCounts = () => {
		setKeyPresses({
			right: 0,
			left: 0,
			up: 0,
			down: 0,
			return: 0,
			escape: 0,
			q: 0
		})
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

			// Add clear functionality
			if (input === "c") {
				clearCounts()
				return
			}

			// Update key press counts
			setKeyPresses((prev) => {
				const updates = { ...prev }

				if (key.rightArrow) updates.right += 1
				if (key.leftArrow) updates.left += 1
				if (key.upArrow) updates.up += 1
				if (key.downArrow) updates.down += 1
				if (key.return) updates.return += 1
				if (input === "q") updates.q += 1

				return updates
			})
		},
		{ isActive: options.raw }
	)

	if (!options.raw) {
		return <Text>Run with --raw flag to start</Text>
	}

	return (
		<Box flexDirection="column">
			<Text>Use arrow keys to move (q to quit)</Text>
			<Text>Key Press Counts:</Text>
			<Box flexDirection="column">
				<Text>→ Right Arrow: {keyPresses.right}</Text>
				<Text>← Left Arrow: {keyPresses.left}</Text>
				<Text>↑ Up Arrow: {keyPresses.up}</Text>
				<Text>↓ Down Arrow: {keyPresses.down}</Text>
				<Text>⏎ Return: {keyPresses.return}</Text>
				{showExitingMessage && <Text>Press q again to quit</Text>}
			</Box>
		</Box>
	)
}
