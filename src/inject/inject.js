chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			$('.issue-link').each( function( index, element ){
				var issue = this;
				$.get( issue.href, function(data) {
					var html = $($.parseHTML(data));
					var assignee = html.find(".assignee");
					if (assignee.length > 0) {
						assignee = assignee.parent()[0];
						var wrapped = $("<small>").html(assignee);
						$(issue).after("&nbsp;(" + wrapped.html() + ")");
					} else if (issue.href.indexOf("pull") != -1) {
						var author = html.find("#partial-discussion-header .author");
						if (author.length > 0) {
							author = author[0];
							var wrapped = $("<small>").html(author);
							$(issue).after("&nbsp;(Pull Request by " + wrapped.html() + ")");
						}
					}
				});
			});

		}
	}, 10);
});