import React from "react"
import test from "ava"
import { render } from "ink-testing-library"
import Command from "./source/commands/index.js"
import { setTimeout } from "node:timers/promises"

// Define key sequences
const KEYS = {
	RIGHT: "\u001b[C",
	LEFT: "\u001b[D",
	UP: "\u001b[A",
	DOWN: "\u001b[B",
	ENTER: "\r",
	ESC: "\u001b",
	Q: "q"
} as const

// Basic test that works
test("renders non-raw mode message", (t) => {
	const { lastFrame } = render(<Command options={{ raw: false }} />)
	t.is(lastFrame(), "Run with --raw flag to start")
})

test("handles right arrow key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.RIGHT)
	await setTimeout(50)

	const expectedOutput = [
		"Use arrow keys to move (q to quit)",
		"Key Press Counts:",
		"→ Right Arrow: 1",
		"← Left Arrow: 0",
		"↑ Up Arrow: 0",
		"↓ Down Arrow: 0",
		"⏎ Return: 0"
	].join("\n")

	t.is(instance.lastFrame(), expectedOutput)
})

test("handles left arrow key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.LEFT)
	await setTimeout(50)

	const expectedOutput = [
		"Use arrow keys to move (q to quit)",
		"Key Press Counts:",
		"→ Right Arrow: 0",
		"← Left Arrow: 1",
		"↑ Up Arrow: 0",
		"↓ Down Arrow: 0",
		"⏎ Return: 0"
	].join("\n")

	t.is(instance.lastFrame(), expectedOutput)
})

test("handles up arrow key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.UP)
	await setTimeout(50)

	const expectedOutput = [
		"Use arrow keys to move (q to quit)",
		"Key Press Counts:",
		"→ Right Arrow: 0",
		"← Left Arrow: 0",
		"↑ Up Arrow: 1",
		"↓ Down Arrow: 0",
		"⏎ Return: 0"
	].join("\n")

	t.is(instance.lastFrame(), expectedOutput)
})

test("handles q key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.Q)
	await setTimeout(50)

	const expectedOutput = [
		"Use arrow keys to move (q to quit)",
		"Key Press Counts:",
		"→ Right Arrow: 0",
		"← Left Arrow: 0",
		"↑ Up Arrow: 0",
		"↓ Down Arrow: 0",
		"⏎ Return: 0",
		"Press q again to quit"
	].join("\n")

	t.is(instance.lastFrame(), expectedOutput)
})

test("handles return key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.ENTER)
	await setTimeout(50)

	const expectedOutput = [
		"Use arrow keys to move (q to quit)",
		"Key Press Counts:",
		"→ Right Arrow: 0",
		"← Left Arrow: 0",
		"↑ Up Arrow: 0",
		"↓ Down Arrow: 0",
		"⏎ Return: 1"
	].join("\n")

	t.is(instance.lastFrame(), expectedOutput)
})
