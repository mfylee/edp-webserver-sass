/**
 * @file 处理less输出
 * @author mfylee
 *
 * @param {Object=} compileOptions scss编译参数
 * @param {string=} encoding 源编码方式
 * @return {Function}
 */

var sass = require('node-sass');
var path = require('path');
module.exports = exports = function SassCompiler() {
    return function (context) {
        var docRoot  = context.conf.documentRoot;
        var pathname = context.request.pathname;

        var file = path.join(docRoot, pathname);

        context.header['content-type'] = 'text/css';

        try {
            var result = sass.renderSync({
                file: file
            });

            context.content = result.css.toString();
            context.start();
        }
        catch (e) {
            context.content = e.message;
            context.status = 500;
            context.start();
        }
    };
};


