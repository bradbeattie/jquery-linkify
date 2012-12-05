// Regex from http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links/37687#37687
function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
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
