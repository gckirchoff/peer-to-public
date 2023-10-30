<script lang="ts">
	// From https://svelte.dev/repl/d2b97bcce5b34a2690748ac459716125?version=3.44.2
	import Vditor from 'vditor';
	import { nanoid } from 'nanoid';
	import type { PostImageRes } from '../../../../routes/api/temp-images/types';
	export let value = '';
	export let id = nanoid();
	let vditor: Vditor | undefined = undefined;

	let initialize = () => {
		// onMount because it relies on an id, you can't pass an element to the fn
		// should autogenerate an id to avoid conflicts with multiple instances

		vditor = new Vditor(id, {
			height: 400,
			// i18n: "en_US",
			lang: 'en_US',
			value: value,
			mode: 'wysiwyg',
			toolbar: [
				// "emoji",
				'headings',
				'bold',
				'italic',
				'strike',
				'|',
				'line',
				'quote',
				'list',
				'ordered-list',
				// "check",
				'outdent',
				'indent',
				'code',
				'inline-code',
				//"insert-after",
				//"insert-before",
				//"code-theme",
				//"content-theme",
				// "export",
				'undo',
				'redo',
				'upload',
				'link',
				'table',
				//"record",
				'edit-mode',
				// "both",
				// "preview",
				'fullscreen',
				'outline',
				// "devtools",
				'br',
			],
			// cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.8.7', //defaults to jsdlvr
			toolbarConfig: {
				pin: true,
			},
			cache: {
				enable: false,
			},
			after: () => {},
			input: (val) => {
				value = val;
			},
			upload: {
				// url: '/api/images',
				// linkToImgUrl: '/images/postImages/',
				handler: async (files) => {
					const file = files[0];
					const fileName = file.name;
					// Send the file name along with the file to the backend
					const formData = new FormData();
					formData.append('file', file, fileName);
					formData.append('fileName', fileName);

					// Send the formData to the backend using an API call (e.g., fetch or axios)

					try {
						const response = await fetch('/api/temp-images', {
							method: 'POST',
							body: formData,
						});
						const { url, fileName } = (await response.json()) as PostImageRes;

						vditor?.insertValue(`![${fileName}](${url})`);
						return null;
					} catch (error) {
						console.warn(error);
						throw new Error('Could not upload photo');
					}
				},
			},
		});
	};

	// update parent component value
	let update = (val) => {
		if (typeof vditor != 'undefined') {
			if (value != vditor.getValue()) {
				vditor.setValue(value);
			}
		}
	};

	$: update(value);
</script>

<div {id} use:initialize />

<style>
	@import 'https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/index.css';
	@import 'https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/css/content-theme/light.css';

</style>
