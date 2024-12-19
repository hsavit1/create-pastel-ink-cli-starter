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

	t.regex(instance.lastFrame()!, /RIGHT: 1/)
})

test("handles left arrow key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.LEFT)
	await setTimeout(50)

	t.regex(instance.lastFrame()!, /LEFT: 1/)
})

test("handles up arrow key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.UP)
	await setTimeout(50)

	t.regex(instance.lastFrame()!, /UP: 1/)
})

test("handles q key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.Q)
	await setTimeout(50)

	t.regex(instance.lastFrame()!, /Press q again to quit/)
})

test("handles return key", async (t) => {
	const instance = render(<Command options={{ raw: true }} />)
	await setTimeout(50)

	instance.stdin.write(KEYS.ENTER)
	await setTimeout(50)

	t.regex(instance.lastFrame()!, /RETURN: 1/)
})
