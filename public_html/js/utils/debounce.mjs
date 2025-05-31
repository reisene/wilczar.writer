/**
 * Description
 * @author AKNETH Studio Katarzyna Pawłowska-Malesa
 * @date 2025-06-01
 * @param {any} fn
 * @param {any} delay=200
 * @returns {any}
 */
export const debounce = (fn, delay = 200) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
};