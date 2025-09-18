let current = 0;

export default function animate(target, args) {
	current += (target - current) * 0.1; // 0.1是平滑系数
	args = current;
	if (Math.abs(target - current) > 0.5) {
		requestAnimationFrame(() => animate(target));
	}
}