import {
	reactive,
	readonly
} from 'vue';

const _store = reactive({
	data: {

	}
});

export default {
	get store() {
		return readonly(_store);
	},
	setData(val) {
		_store.data = val;
	}
};