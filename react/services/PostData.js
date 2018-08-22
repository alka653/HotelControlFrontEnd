const ID_TOKEN_KEY = 'id_auth_token_hotel_control'

function clearIdToken(){
	localStorage.removeItem(ID_TOKEN_KEY)
}
function getTokenExpirationDate(token){
	return !token['expired'] ? null : new Date(token['expired'])
}
function isTokenExpired(token){
	return getTokenExpirationDate(token) < new Date()
}
export function logout(){
	clearIdToken()
}
export function getIdToken(value){
	const item = localStorage.getItem(ID_TOKEN_KEY)
	return item ? JSON.parse(item)[value]: null
}
export function setIdToken(idToken){
	localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(idToken))
}
export function isLoggedIn(){
	const idToken = getIdToken('expired')
	return idToken != null ? isTokenExpired(idToken): false
}
export function postData(type, userData){
	let loginUrl = `${server_url}auth/${type}`
	return new Promise((resolve, reject) =>{
		fetch(loginUrl,{
			method: 'POST',
			body: JSON.stringify(userData)
		})
		.then((response) => response.json())
		.then((responseJson) =>{
			resolve(responseJson)
		})
		.catch((error) =>{
			reject(error)
		})
	})
}