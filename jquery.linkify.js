// Regex from http://daringfireball.net/2010/07/improved_regex_for_matching_urls
function replaceURLWithHTMLLinks(text) {
    var exp = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
    return text.replace(exp,"<a href='$1'>$1</a>");
}

function recursiveLinkify(element) {
    $.each(
        element.contents(),
        function(index, element) {
            element = $(element);
            if (element.get(0).nodeType == document.TEXT_NODE) {
                element.replaceWith(replaceURLWithHTMLLinks(element.text()));
            } else if (element.prop("tagName") != "A" && element.prop("tagName") != "BUTTON") {
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
