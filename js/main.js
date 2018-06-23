//save bookmark
const saveBookmark=(e)=>{
	//get siteName value
	const siteName=document.getElementById("siteName").value;
	const siteURL=document.getElementById("siteURL").value;

	//save it as an array
	let Bookmark={
		name:siteName,
		url:siteURL
	};
   if(!validform(siteName,siteURL)){
   	return false;
   }


	/*
	//local storage test
	localStorage.setItem('test','Hello World');
	
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'))
	*/
	

	//save the sites to local storage

	//test if bookmark is null
	if(localStorage.getItem('bookmarks') === null){
		//init array
		var bookmarks=[];
		//add to array
		bookmarks.push(Bookmark);
		//set to localstorage
		//change it in string
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}else{
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(Bookmark);
		//re-set it to localStorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}
//reset th form after submitting
document.getElementById('myForm').reset();
	
   fetchbookmarks();

	//prevent deafault from submitting
	e.preventDefault();
}
//delete bookmark
function deletebookmark(url){
	//get the bookmarks from local storage
		var boo=JSON.parse(localStorage.getItem('bookmarks'));
		//loop through the bookmarks
		for(let i=0;i<boo.length;i++)
		{
			console.log(url);
			if(boo[i].url==url)
			{
				//remove from array
				boo.splice(i, 1);
			}
		}	
		//re-set the array in local storage
		localStorage.setItem('bookmarks',JSON.stringify(boo));	
		//re-fetch
		fetchbookmarks();



}
// fetch bookmarks
function fetchbookmarks(){
	//get bookmarks from local storage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	//get output id
	   const bookmark_result=document.getElementById("book_re")	;

	   bookmark_result.innerHTML='';
	   //loop through bookmarks in localstorage
	   for(var i=0; i < bookmarks.length;i++){
	   	let name=bookmarks[i].name;
	   	let url=bookmarks[i].url;
	   	//puuting the inner html
	   	bookmark_result.innerHTML +=`<div class="well">
	   	                              <h3>  ${name}
	   	                              <a class="btn btn-default" target="_blank" href="${url}">VISIT </a>
	   	                              <a onclick='deletebookmark("${url}")' class="btn btn-danger" href="#" >DELETE </a>
	   	                              </h3> 
	   	                              </div>`
	   }
}
//validate form
function validform(siteName,siteURL){
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

	if(!siteName || !siteURL){
		alert("please fill the form");
		return false;
	}
   if(!siteURL.match(regex)){
   	alert("please use a valid url");
   }
   return true;
}

//Listen for form Submit
document.getElementById("myForm").addEventListener('submit',saveBookmark);

