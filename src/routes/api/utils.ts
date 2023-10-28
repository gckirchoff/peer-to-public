import { writeFile, rename, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomDefaultPhoto, slugify } from '$lib/utils/logic';
import type { PatchReqPostBody, PostReqPostBody } from './posts/constants';
import type { Modify } from '$lib/utils/tsUtils';

const makePostDir = async (slug: string): Promise<void> => {
	if (!existsSync(`static/images/postImages/${slug}`)) {
		await mkdir(`static/images/postImages/${slug}`);
	}
};

const uploadAndGetCoverImage = async (
	coverImage: string | undefined,
	slug: string,
	newImageFile: Blob | null,
): Promise<string> => {
	if (newImageFile) {
		const buffer = Buffer.from(await newImageFile.arrayBuffer());

		await makePostDir(slug);

		const filePath = `static/images/postImages/${slug}/${newImageFile.name}`;
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
		const slug = slugify(body.title);

		const coverImage = await uploadAndGetCoverImage(image, slug, newImageFile);

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

		await makePostDir(slug);

		const newFolderPath = `postImages/${slug}`;
		for (const image of imagesToMove) {
			await rename(`static/images/temp/${image}`, `static/images/${newFolderPath}/${image}`);
		}

		return post.replaceAll('/temp/', `/${newFolderPath}/`);
	} catch (err) {
		console.warn(err);
		throw new Error((err as { message: string })!.message);
	}
};
