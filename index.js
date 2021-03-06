"use strict";
exports.__esModule = true;
var Swapper = /** @class */ (function () {
    function Swapper(htmlPath, rootElement, firstSwap) {
        if (htmlPath[htmlPath.length - 1] !== '/')
            htmlPath += '/';
        this.htmlPath = htmlPath;
        this.rootElement = document.querySelector(rootElement);
        if (typeof firstSwap === 'string')
            this.swap(firstSwap);
        this.updateTargets();
    }
    Swapper.prototype.updateTargets = function (element) {
        var _this = this;
        if (element === null || element === undefined)
            element = this.rootElement;
        var _loop_1 = function (i) {
            var child = element.children[i];
            if (child.hasAttribute('swapper-swap')) {
                child.addEventListener('click', function () {
                    _this.swap(child.getAttribute('swapper-swap'));
                });
            }
            if (child.children.length > 0)
                this_1.updateTargets(child);
        };
        var this_1 = this;
        for (var i = 0; i < element.children.length; i++) {
            _loop_1(i);
        }
    };
    Swapper.prototype.swap = function (target, callback) {
        var _this = this;
        var targetPath;
        if (target.indexOf('.html') !== target.length - 6)
            targetPath = this.htmlPath + target + '.html';
        else
            targetPath = this.htmlPath + target;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType('document/html');
        xmlhttp.open('GET', targetPath);
        xmlhttp.onloadend = function () {
            if (xmlhttp.status === 200) {
                _this.rootElement.innerHTML = xmlhttp.responseText;
                _this.updateTargets();
                if (callback !== null && callback !== undefined)
                    callback(target);
                if (typeof _this.onswap === 'function')
                    _this.onswap(target);
            }
            else
                console.warn("[ Swapper ] Failed to swap to '" + target + "'. With error: '" + xmlhttp.statusText + "'.");
        };
        xmlhttp.onerror = function () {
            console.warn("[ Swapper ] Failed to swap to '" + target + "'. With error: '" + xmlhttp.statusText + "'.");
        };
        xmlhttp.send();
    };
    return Swapper;
}());
exports["default"] = Swapper;
