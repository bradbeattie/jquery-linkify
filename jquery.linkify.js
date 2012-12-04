// Regex from http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links/37687#37687
function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>");
}

function recursiveLinkify(element) {
    var response = $.map(
        element.contents(),
        function(element, i) {
            if (element.nodeType == document.TEXT_NODE) {
                return replaceURLWithHTMLLinks(element.textContent);
            }
            element = $(element)
            if (element.prop("tagName") != "A") {
                return recursiveLinkify(element);
            } else {
                return element[0].outerHTML;
            }
        }
    );
    return response.join("");
}

(function($) {
    $.fn.linkify = function(opts) {
        return this.each(function() {
            var element = $(this);
            element.html(recursiveLinkify(element));
        });
    }
})(jQuery);
