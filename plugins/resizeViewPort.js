'use strict';

exports.type = 'perItem';

exports.active = false;

exports.params = {
    width: 18,
    height: 18
};

var regViewBox = /^0\s0\s([\-+]?\d*\.?\d+([eE][\-+]?\d+)?)\s([\-+]?\d*\.?\d+([eE][\-+]?\d+)?)$/;

/**
 * Remove viewBox attr which coincides with a width/height box.
 *
 * @see http://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute
 *
 * @example
 * <svg width="100" height="50" viewBox="0 0 100 50">
 *             ⬇
 * <svg width="100" height="50">
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item, params) {

    if (
        item.isElem('svg') &&
        item.hasAttr('viewBox') &&
        item.hasAttr('width') &&
        item.hasAttr('height')
    ) {

        var match = item.attr('viewBox').value.match(regViewBox);

        if (match) {
            item.attr('width').value = params.width;
            item.attr('height').value = params.height;
            var x = (params.width - match[1]) / 2;
            var y = (params.height - match[3]) / 2;
            item.attr('viewBox').value = '' + (0 - x) + ' ' + (0 - y) + ' ' + params.width + ' ' + params.height;
        }

    }

};
