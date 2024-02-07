$(document).ready(function () {
	fetchData();
});

function fetchData() {
	$('#fetchButton').click(function () {
		fetch('/data.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				displayData(data);
			})
			.catch((error) => {
				$('#dataContainer').html('Error fetching data: ' + error.message);
			});
	});

	function displayData(data) {
		var html = '<article id="page">';

		data.pages.forEach((page) => {
			html += displayPage(page);
		});

		html += '</article>';
		$('#dataContainer').html(html);
	}

	function displayPage(page) {
		var pageHtml = '<div>';
		if (page.subpages && page.subpages.length > 0) {
			pageHtml += '<span class="toggle element"><span class="arrow"><i class="bi bi-align-center bi-caret bi-caret-down-fill"></i></span>';
			pageHtml += '<i class="bi bi-align-center bi-folder2"></i>' + page.url + '</span>';

			pageHtml += '<div class="subpages">';
			page.subpages.forEach((subpage) => {
				pageHtml += displayPage(subpage);
			});
			pageHtml += '</div>';
		} else {
			pageHtml += '<span class="element"><i class="bi bi-align-center bi-globe2"></i>' + page.url + '</span>';
		}

		pageHtml += '</div>';
		return pageHtml;
	}

	$('#dataContainer').on('click', '.toggle', function () {
		$(this).siblings('.subpages').toggle();
		$(this)
			.find('.arrow')
			.html(function (_, icon) {
				console.log(icon);
				return icon === '<i class="bi bi-align-center bi-caret bi-caret-down-fill"></i>' ? '<i class="bi bi-align-center bi-caret bi-caret-right-fill"></i>' : '<i class="bi bi-align-center bi-caret bi-caret-down-fill"></i>';
			});
	});
}

fetchData();
