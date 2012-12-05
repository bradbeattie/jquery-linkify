function recursiveLinkify(element) {

    // Regex from http://daringfireball.net/2010/07/improved_regex_for_matching_urls
    var matchURLs = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;

    // For each content node in the given element,
    $.each(
        element.contents(),
        function(index, element) {
            element = $(element);

            // Replace it's content if it's a text node
            if (element.get(0).nodeType == document.TEXT_NODE) {
                element.replaceWith(
                    element.text().replace(
                        matchURLs,
                        function(str) {
                            return "<a href='"+(str.indexOf("://") === -1 ? "http://" : "")+str+"'>"+str+"</a>";
                        }
                    )
                );
            }

            // Or recurse down into it if it's not an anchor or a button
            else if (element.prop("tagName") != "A" && element.prop("tagName") != "BUTTON") {
                recursiveLinkify(element);
            }
        }
    );
}

(function($) {
    $.fn.linkify = function(opts) {
        return this.each(function() {
            recursiveLinkify($(this));
        });
    }
})(jQuery);
