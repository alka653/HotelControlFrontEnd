export function PostData(type, userData){
	let loginUrl = server_url+"auth/"+type
	return new Promise((resolve, reject) => {
		fetch(loginUrl, {
			method: 'POST',
			body: JSON.stringify(userData)
		})
		.then((response) => response.json())
		.then((responseJson) => {
			resolve(responseJson)
		})
		.catch((error) => {
			reject(error)
		})
	})
}