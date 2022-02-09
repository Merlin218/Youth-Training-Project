import html2canvas from 'html2canvas';

export async function html2image(element: HTMLElement): Promise<string> {
	const rect = element.getBoundingClientRect();
	const canvas = await html2canvas(element, {
		width: rect.width,
		height: rect.height,
	});

	return canvas.toDataURL();
}
