/*
	Test Backend Engineer at Cermati
	Name: Poppy Fedora

	Modules included are cheerio, request, and bluebird.
*/

var Promise = require("bluebird");
const request = Promise.promisify(require('request'));
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('solution.json');

var i;
var result_arr = [];
var link, category_selected, items_of_category, href, title, src, item;	
var result = [];

for (i = 1; i < 7; i++) { 
	link = 'https://www.bankmega.com/ajax.promolainnya.php?product=0&subcat=' + i;
	
	request(link,(error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			category_selected = $('#subcatpromo #subcatselected img').attr('title');
			items_of_category = [];

			if ($('#promolain a').length > 0) {
				$('#promolain a').each((i, el) => {
					href = $(el).attr('href');
					title = $(el).find('img').attr('title');
					src = $(el).find('img').attr('src');

					items_of_category.push({
						href : href,
						title : title,
						src : src
					});
				});
			}

			item = {
				[category_selected] : items_of_category
			};
			writeStream.write(JSON.stringify(item));
		}
	});
}