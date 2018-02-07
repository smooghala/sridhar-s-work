
import { PostDataSort } from './PostDataSort';
export class PostData {
	asOf: string;
	dimType: string;
	lazy: boolean;
	desc: string;
	soeid: string;
	enabled: boolean;
	multiSelect: boolean;
	selectedValues: string;
	pearlEnabled: string;
	datasetId: number;
	page: number;
	start: number;
	limit: number;
	sort: PostDataSort[];
	node: string;
}
