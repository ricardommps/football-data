import toast from 'cogo-toast'

const getDefaultProperties = (properties) => {
	if (!properties) {
		return {
			position: 'top-right'
		}
	}
	return properties
}

let showWarningMessage = (message, properties) => {
	toast.warn(message, getDefaultProperties(properties))
}
let showErrorMessage = (message, properties) => {
	toast.error(message, getDefaultProperties(properties))
}

let showSuccessMessage = (message, properties) => {
	toast.success(message, getDefaultProperties(properties))
}

let showInfoMessage = (message, properties) => {
	toast.info(message, getDefaultProperties(properties))
}

export default {
	showWarningMessage,
	showErrorMessage,
	showSuccessMessage,
	showInfoMessage
}
