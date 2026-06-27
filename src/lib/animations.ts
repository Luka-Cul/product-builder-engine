export function animateValue(
    start: number,
    end: number,
    duration: number,
    onUpdate: (value: number) => void
) {
    const startTime = performance.now();

    const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const current = Math.round(start + (end - start) * eased);
        onUpdate(current);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}