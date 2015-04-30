var main = function () {
    "use strict";
    var tabNumber;
    for (tabNumber = 1; tabNumber <= 3; tabNumber++) {
        var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
            $(tabSelector).on("click", function () {
            $(".tabs span").removeClass("active");
            $(tabSelector).addClass("active");
            return false;
        });
    }
};