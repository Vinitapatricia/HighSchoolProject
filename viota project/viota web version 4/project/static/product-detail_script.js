document.addEventListener('DOMContentLoaded', () =>{
	
	const wishList = document.querySelector(".WishList")

	console.log(wishList)
	wishList.addEventListener("click", () =>{
		wishList.classList.toggle("active")
	})

	document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () =>{
		wishList.classList.remove("active")
	}))

})