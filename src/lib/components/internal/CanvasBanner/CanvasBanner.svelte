<script lang="ts">
	import { onMount, tick } from 'svelte';

	import { randNumBetween } from '$lib/utils/math';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let width: number;
	let height: number;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		radius: number;
		color: string;
	}

	let particles: Particle[] = [];
	const initialParticleCount: number = 10;
	const maxParticleCount: number = 10; // Max number of particles in the canvas
	const maxDistance: number = 100;

	interface MousePosition {
		x: number | null;
		y: number | null;
	}

	const mouse: MousePosition = { x: null, y: null };

	// Initialize particles within the canvas
	function createParticles(count: number): void {
		for (let i = 0; i < count; i++) {
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.3, // Decreased speed
				vy: (Math.random() - 0.5) * 0.3,
				radius: randNumBetween(5, 10),
				color: Math.random() < 0.5 ? '#6EFFD1' : '#9E95F1', // Random color
			});
		}
	}

	// Generate a particle outside the canvas moving into the canvas
	function generateParticleOutsideCanvas(): Particle {
		// Decide randomly from which side (top, right, bottom, left) the particle will come
		const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
		let x: number, y: number, vx: number, vy: number;

		const speed = Math.random() * 0.3 + 0.2; // Random speed between 0.2 and 0.7

		switch (side) {
			case 0: // Top
				x = Math.random() * width;
				y = -10; // Slightly above the canvas
				vx = (Math.random() - 0.5) * 0.3;
				vy = speed;
				break;
			case 1: // Right
				x = width + 10;
				y = Math.random() * height;
				vx = -speed;
				vy = (Math.random() - 0.5) * 0.3;
				break;
			case 2: // Bottom
				x = Math.random() * width;
				y = height + 10;
				vx = (Math.random() - 0.5) * 0.3;
				vy = -speed;
				break;
			case 3: // Left
				x = -10;
				y = Math.random() * height;
				vx = speed;
				vy = (Math.random() - 0.5) * 0.5;
				break;
			default:
				x = Math.random() * width;
				y = -10;
				vx = 0;
				vy = speed;
				break;
		}

		return {
			x,
			y,
			vx,
			vy,
			radius: randNumBetween(5, 10), // Random radius between 2 and 5
			color: Math.random() < 0.5 ? '#6EFFD1' : '#9E95F1', // Random color
		};
	}

	// Update particle positions and remove those outside the canvas
	function updateParticles(): void {
		particles = particles.filter((p) => {
			p.x += p.vx;
			p.y += p.vy;

			// Remove particles that are far outside the canvas bounds
			return p.x >= -50 && p.x <= width + 50 && p.y >= -50 && p.y <= height + 50;
		});

		// Spawn new particles if the number of particles is below the maxParticleCount
		while (particles.length < maxParticleCount) {
			particles.push(generateParticleOutsideCanvas());
		}
	}

	// Draw particles and lines
	function draw(): void {
		ctx.clearRect(0, 0, width, height);

		// Draw lines between particles and to mouse
		for (let i = 0; i < particles.length; i++) {
			const p1 = particles[i];

			// Line to mouse
			if (mouse.x !== null && mouse.y !== null) {
				const dx = p1.x - mouse.x;
				const dy = p1.y - mouse.y;
				const dist = Math.hypot(dx, dy);

				if (dist < maxDistance) {
					const alpha = 1 - dist / maxDistance;
					ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(mouse.x, mouse.y);
					ctx.stroke();
				}
			}

			// Lines to other particles
			for (let j = i + 1; j < particles.length; j++) {
				const p2 = particles[j];
				const dx = p1.x - p2.x;
				const dy = p1.y - p2.y;
				const dist = Math.hypot(dx, dy);

				if (dist < maxDistance) {
					const alpha = 1 - dist / maxDistance;
					ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.stroke();
				}
			}
		}

		// Draw particles
		particles.forEach((p) => {
			ctx.fillStyle = p.color;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		});
	}

	// Animation loop
	function animate(): void {
		updateParticles();
		draw();
		requestAnimationFrame(animate);
	}

	// Handle mouse move
	function onMouseMove(e: MouseEvent): void {
		const rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	}

	// Handle mouse out
	function onMouseOut(): void {
		mouse.x = null;
		mouse.y = null;
	}

	// Handle click to spawn new particles
	function onClick(e: MouseEvent): void {
		const rect = canvas.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickY = e.clientY - rect.top;

		// Spawn new particles moving away from the click point
		for (let i = 0; i < 5; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = Math.random() * 0.5 + 0.2; // Decreased speed
			particles.push({
				x: clickX,
				y: clickY,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				radius: randNumBetween(5, 10),
				color: Math.random() < 0.5 ? '#6EFFD1' : '#9E95F1', // Random color
			});
		}
	}

	// Resize canvas to fit the parent element
	function resizeCanvas(): void {
		const parent = canvas?.parentElement;
		if (parent) {
			const rect = parent.getBoundingClientRect();
			width = canvas.width = rect.width;
			height = canvas.height = rect.height;
		}
	}

	onMount(async () => {
		ctx = canvas.getContext('2d')!;

		// Wait for the DOM to update to get accurate sizes
		await tick();
		resizeCanvas();
		createParticles(initialParticleCount);
		animate();

		// Observe parent element size changes
		const parent = canvas?.parentElement;
		let resizeObserver: ResizeObserver;

		if (parent) {
			resizeObserver = new ResizeObserver(resizeCanvas);
			resizeObserver.observe(parent);
		}

		canvas.addEventListener('mousemove', onMouseMove);
		canvas.addEventListener('mouseout', onMouseOut);
		canvas.addEventListener('click', onClick);

		return () => {
			if (parent && resizeObserver) {
				resizeObserver.unobserve(parent);
			}
			canvas.removeEventListener('mousemove', onMouseMove);
			canvas.removeEventListener('mouseout', onMouseOut);
			canvas.removeEventListener('click', onClick);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
