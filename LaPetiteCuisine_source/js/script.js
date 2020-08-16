function ShowSearchBar() 
{
    var bar_search = document.getElementById("search-box");
    if (bar_search.style.visibility === "hidden")
    {
        bar_search.style.visibility = "visible";
        bar_search.focus();
    }
    else {
        bar_search.style.visibility = "hidden";
    }
}

$('#banner').owlCarousel({
	loop:true,
	margin:4,
	nav:true,
	autoplay:true,
	autoplayTimeout:4000,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:1
		},
		1000:{
			items:1
		}
	}
});
