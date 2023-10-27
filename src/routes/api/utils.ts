import { writeFile, rename, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomDefaultPhoto } from '$lib/utils/logic';
import type { PatchReqPostBody, PostReqPostBody } from './posts/constants';
import type { Modify } from '$lib/utils/tsUtils';

const uploadAndGetCoverImage = async (
	coverImage: string | undefined,
	newImageFile: Blob | null,
): Promise<string> => {
	if (newImageFile) {
		const buffer = Buffer.from(await newImageFile.arrayBuffer());
		const filePath = `static/images/postImages/${newImageFile.name}`;

		await writeFile(filePath, buffer, 'base64');
		return newImageFile.name;
	}

	if (coverImage) {
		return coverImage;
	}

	return randomDefaultPhoto();
};

export type PostEditorUploadRet = Modify<
	PostReqPostBody | PatchReqPostBody,
	{
		coverImage: string;
	}
>;

export const getPostEditorUploadAndHandleImageUpload = async (
	request: Request,
): Promise<PostEditorUploadRet> => {
	try {
		const formData = await request.formData();
		const body = JSON.parse(formData.get('data') as string) as PostReqPostBody | PatchReqPostBody;
		const { coverImage: image } = body;

		const newImageFile = formData.get('newImage') as Blob | null;

		const coverImage = await uploadAndGetCoverImage(image, newImageFile);

		return {
			...body,
			coverImage,
		};
	} catch (err) {
		throw new Error((err as { message: string }).message);
	}
};

export const processContentImages = async (post: string, slug: string): Promise<string> => {
	try {
		const tempImageFinder = /(?<=\/temp\/).+?(?=(\)|"))/g;
		const imagesToMove = [...post.matchAll(tempImageFinder)].map(([fileName]) => fileName);

		if (!imagesToMove.length) {
			return post;
		}

		const newFolderPath = `postImages/${slug}`;

		if (!existsSync(`static/images/${newFolderPath}`)) {
			await mkdir(`static/images/${newFolderPath}`);
		}
		for (const image of imagesToMove) {
			await rename(`static/images/temp/${image}`, `static/images/${newFolderPath}/${image}`);
		}

		return post.replaceAll('/temp/', `/${newFolderPath}/`);
	} catch (err) {
		console.warn(err);
		throw new Error((err as { message: string })!.message);
	}
};
