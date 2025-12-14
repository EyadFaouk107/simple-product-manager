let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let deleteAll = document.querySelector("#deleteall");
let mode = "create";
let temp;


// get total

function getTotal(){
	if (price.value != ""){
		let result = +price.value + +taxes.value + +ads.value - +discount.value;
		total.innerHTML = result;
		total.style.background = "green"
	}else{
		total.style.background = "red"
	}

}
 getTotal(); 

// create product
let dataPro;

if (localStorage.product != null){
	 dataPro = JSON.parse(localStorage.product);
}else{
	 dataPro = []
}

submit.onclick = function(){
	let newPro = {
		title: title.value,
		price: price.value,
		taxes: taxes.value,
		ads:ads.value,
		discount: discount.value,
		total: total.innerHTML,
		count: count.value,
		category: category.value,
	}
// count 
	if(mode === "create"){
		if(newPro.count > 0){
			for(let i = 0; i < newPro.count; i++){
			dataPro.push(newPro);
			}
		}else{
			dataPro.push(newPro);
		}
	}else{
		dataPro[temp] = newPro;
		mode = "create"
		submit.innerHTML = "Create";
		count.style.display = "block";
	}


	// save in localStorage
	localStorage.setItem("product", JSON.stringify(dataPro));
	clearData();
	showData();
};

// clear data

function clearData(){
	title.value = "";
	price.value = "";
	taxes.value = "";
	ads.value = "";
	discount.value= "";
	total.innerHTML = "";
	count.value = "";
	category.value = "";
}	

// show data
function showData(){
	getTotal();
		let table = " ";
		for (let i =0; i < dataPro.length; i++){
			table += `
				<tr>
					<td>${i+1}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick="updateData(${i})" id="update">Update</button></td>
					<td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
				</tr>	
			`
		}
	document.getElementById("tbody").innerHTML = table
	// delete all
	
	if ( dataPro.length > 0){
		deleteAll.innerHTML = `
			<button onclick="deleteAllProducts()" id = "DeleteAllBtn">Delete All (${dataPro.length})</button>
		`
	}else{
		deleteAll.innerHTML = "";
	}
}
showData();


// delete 

function deleteElement(i){
	dataPro.splice(i,1);
	localStorage.product = JSON.stringify(dataPro);
	showData()
}

// delete all

function deleteAllProducts(){
	
	dataPro.splice(0,dataPro.length);
	localStorage.product = JSON.stringify(dataPro);
	showData();
	clearData();
	mode = "create";
	submit.innerHTML = "create";
}

// update data
function updateData(i){
	title.value = dataPro[i].title;
	price.value = dataPro[i].price;
	taxes.value = dataPro[i].taxes;
	ads.value = dataPro[i].ads;
	discount.value = dataPro[i].discount;
	getTotal();
	count.style.display = "none"
	category.value = dataPro[i].category;
	submit.innerHTML = "update";
	mode = "update";
	temp = i;
	scroll({
		top: 0,
		behavior: "smooth",
	})
}

// search data
let searchBar = document.getElementById("search")
let searchMode = "title";
function getSearchMode(id){
	if(id == "Searchbytitle"){
		searchMode="title"
		search.placeholder = "Search By Title";
	}else{
		searchMode="category"
		search.placeholder = "Search By Category";
	}
	searchBar.focus();
}

function searchData(value){
	let table = "";
	if(searchMode == "title"){
		for(let i = 0; i < dataPro.length; i++){
			if(dataPro[i].title.includes(value)){
			table += `
				<tr>
					<td>${i+1}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick="updateData(${i})" id="update">Update</button></td>
					<td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
				</tr>	
			`
			document.getElementById("tbody").innerHTML = table;			
			}

		}
	}else{
		for(let i = 0; i < dataPro.length; i++){
			if(dataPro[i].category.includes(value)){
			table += `
				<tr>
					<td>${i+1}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick="updateData(${i})" id="update">Update</button></td>
					<td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
				</tr>	
			`
			document.getElementById("tbody").innerHTML = table;			
			}

		}
	}
}