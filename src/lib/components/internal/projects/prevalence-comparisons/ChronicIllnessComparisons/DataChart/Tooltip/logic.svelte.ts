import type { PrevalenceData } from "../../constants";

export class HoveredData {
	current = $state<PrevalenceData | null>(null);

	constructor() {}

	set = (hoveredData: PrevalenceData) => (this.current = hoveredData);

	unset = () => (this.current = null);
}
