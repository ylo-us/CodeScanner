import { combineReducers, createStore } from 'redux';
import Camera from 'react-native-camera';

const cameraInitState = {
	showCamera: true,
	cameraType: 'back'
};

const productInitState = {
	product_name: '',
	upc: 0,
	message: ''
};

const cameraReducer = (state=cameraInitState, action) => {
	switch(action.type) {
		case 'SHOW_CAMERA': {
			state = {...state, showCamera: action.payload};
			break;
		}
		case 'SWITCH_CAMERA': {
			if (action.payload === 'back') {
				state = {...state, cameraType: Camera.constants.Type.back};
			} else if (action.payload === 'front') {
				state = {...state, cameraType: Camera.constants.Type.front};
			}
			break;
		}
	}
	return state;
};

const productReducer = (state=productInitState, action) => {
	switch(action.type) {
		case 'UPDATE_PRODUCT_NAME': {
			state = {...state, product_name: action.payload};
			break;
		}
		case 'UPDATE_UPC': {
			state = {...state, upc: action.payload};
			break;
		}
		case 'UPDATE_MESSAGE': {
			state = {...state, message: action.payload};
			break
		}
	}
	return state;
};

const reducers = combineReducers({
	camera: cameraReducer,
	product: productReducer
});

const store = createStore(reducers);


module.exports = {
	store: store,
	reducers: reducers
}