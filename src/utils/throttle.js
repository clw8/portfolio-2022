export default function throttle(func, timeFrame) {
	var lastTime = 0;
	var timeout;
	return function (event) {
		var now = new Date();
		if (now - lastTime >= timeFrame) {
			clearTimeout(timeout);
			func(event);

			timeout = setTimeout(() => {
				func(event);
			}, now - lastTime)
			lastTime = now;
		}
	};
}
