import { writeFile, rename, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomDefaultPhoto, slugify } from '$lib/utils/logic';
import type { PatchReqPostBody, PostReqPostBody } from './v1/posts/constants';
import type { Modify } from '$lib/utils/tsUtils';

const makeDir = async (path: string): Promise<void> => {
	if (!existsSync(path)) {
		await mkdir(path);
	}
};

const uploadAndGetCoverImage = async (
	coverImage: string | undefined,
	slug: string,
	newImageFile: Blob | null,
): Promise<string> => {
	const rootFolderPath = `static/images/postImages/${slug}`;
	await makeDir(rootFolderPath);

	if (newImageFile) {
		const buffer = Buffer.from(await newImageFile.arrayBuffer());
		const filePath = `${rootFolderPath}/${newImageFile.name}`;
		await writeFile(filePath, buffer, 'base64');
		return newImageFile.name;
	}

	if (coverImage) {
		return coverImage;
	}

	const randomCoverImage = randomDefaultPhoto();
	await copyFile(
		`static/images/default-backgrounds/${randomCoverImage}`,
		`${rootFolderPath}/${randomCoverImage}`,
	);
	return randomCoverImage;
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
		const slug = (body as PatchReqPostBody).slug ?? slugify(body.title);

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

		const newFolderPath = `postImages/${slug}`;
		await makeDir(`static/images/${newFolderPath}`);

		for (const image of imagesToMove) {
			await rename(`static/images/temp/${image}`, `static/images/${newFolderPath}/${image}`);
		}

		return post.replaceAll('/temp/', `/${newFolderPath}/`);
	} catch (err) {
		console.warn(err);
		throw new Error((err as { message: string })!.message);
	}
};
