import { PostDataWrapper } from "../../components/shared/models";



export class UrlUtilService {
	lPostDataWrapper;
	get() {
		console.log('getting values')
		return 'shaik';
	}
	formRouterUrlEmptyData(action, method) {
		this.lPostDataWrapper = new PostDataWrapper();
		this.lPostDataWrapper.action = action;
		this.lPostDataWrapper.method = method;
		this.lPostDataWrapper.data = null;
		this.lPostDataWrapper.type = "rpc"
		this.lPostDataWrapper.tid = 76;
		return this.lPostDataWrapper;
	}
	formRouterUrl(action, method, asOf, dimType, lazy, desc, type, limit, soeId, enabled, multiSelect, selectedValues, pearlEnabled, node, paginationOpt, page, datasetId, datasetName, start, sortOpt, property, direction) {
		this.lPostDataWrapper = new PostDataWrapper();
		this.lPostDataWrapper.action = action;
		this.lPostDataWrapper.method = method;
		this.lPostDataWrapper.data = {};
		this.lPostDataWrapper.data.asOf = asOf.value;
		this.lPostDataWrapper.data.page = page;
		if(soeId!=null){
			this.lPostDataWrapper.data.soeId = soeId.value;
		}		
		this.lPostDataWrapper.data.datasetId = datasetId.value;
		if (limit != null) {
			this.lPostDataWrapper.data.limit = limit;
		}
		if (type != null) {
			this.lPostDataWrapper.data.type = type;
		}
		if (datasetName != null) {
			this.lPostDataWrapper.data.datasetName = datasetName;
		}
		if (paginationOpt) {
			this.lPostDataWrapper.data.start = 0;
		}
		if (dimType != null) {
			this.lPostDataWrapper.data.dimType = dimType;
		}
		if (lazy != null) {
			this.lPostDataWrapper.data.lazy = lazy;
		}
		if (desc != null) {
			this.lPostDataWrapper.data.desc = desc;
		}
		if (enabled != null) {
			this.lPostDataWrapper.data.enabled = enabled;
		}
		if (multiSelect != null) {
			this.lPostDataWrapper.data.multiSelect = multiSelect;
		}
		if (selectedValues != null) {
			this.lPostDataWrapper.data.selectedValues = selectedValues;
		}

		if (pearlEnabled != null) {
			this.lPostDataWrapper.data.pearlEnabled = pearlEnabled;
		}

		if (node != null) {
			this.lPostDataWrapper.data.node = node;
		}


		if (sortOpt) {
			this.lPostDataWrapper.data.sort = [];
			this.lPostDataWrapper.data.sort.property = property;
			this.lPostDataWrapper.data.sort.direction = direction;
		}

		this.lPostDataWrapper.type = "rpc"
		this.lPostDataWrapper.tid = 76;
		console.log(this.lPostDataWrapper);
		return this.lPostDataWrapper;
	}
}