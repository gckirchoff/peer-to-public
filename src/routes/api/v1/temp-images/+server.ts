import { dev } from '$app/environment';
import { json, error } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';

export const POST = async ({ request }) => {
	if (!dev) {
		return json({
			success: false,
		});
	}

	try {
		const formdata = await request.formData();

		const file = formdata.get('file') as Blob;
		const nameOverride = formdata.get('fileName') as string;

		const buffer = Buffer.from(await file.arrayBuffer());

		const fileName = nameOverride ?? file.name;
		const filePath = `static/images/temp/${file.name ?? fileName}`;

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
