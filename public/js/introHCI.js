'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	$.get("/project/"+idNumber,addProject);

}

function addProject(result)
{
	var projectHTML = '<a href="#" class="thumbnail">' + '<img src="' + result['image'] + ' " class="detailsImage">' +                 
						'<p>'+result['title']+'</p>'+
						'<p><small>' + result['date']+
						'</small></p></a>'+
						'<p>'+result['summary']+'</p>';
	console.log(result['id']);
	//$(".project #id .details").
	$('#project'+result['id']).find('.details').html(projectHTML);
	//console.log(result);
}


/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	e.preventDefault();
	//$.get("/project/palette",addColor);
	$.get("/palette",addColor);
	console.log("User clicked on color button");
}

function addColor(result)
{
	var colors=result['colors'];
	var hex=colors['hex'];
	$('body').css('background-color',hex[0]);
	$('.thumbnail').css('background-color',hex[1]);
	$('h1,h2,h3,h4,h5').css('color',hex[2]);
	$('p').css('color',hex[3]);
	$('.project img').css('opacity',.75);

	
}