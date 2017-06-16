/**
 * Not necessary https://github.com/SeleniumHQ/selenium/pull/4189
 */

(function () {
	var tmp = location.search.match(/refresh=(\d+)/);
	if (tmp[1]) {
		setTimeout(function () {
			location.reload();
		}, parseInt(tmp[1], 10));
	}
}());