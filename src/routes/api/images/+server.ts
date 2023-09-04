import { dev } from '$app/environment';
import { json, error } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';

export const POST = async ({ request }) => {
	if (!dev) {
		return json({
			success: false,
		});
	}
	// console.log('request', request);

	try {
		const formdata = await request.formData();

		const file = formdata.get('file') as Blob;
		const fileName = formdata.get('fileName') as string;

		const buffer = Buffer.from(await file.arrayBuffer());

		const filePath = `static/images/postImages/${fileName}`;

		await writeFile(filePath, buffer, 'base64');

		return json({
			success: true,
			message: 'Image uploaded',
			url: filePath.replace('static', ''),
			fileName: fileName.split('.')[0],
		});
	} catch (err) {
		throw error(400, 'Error uploading file');
	}
};
