const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const obfuscator = require('javascript-obfuscator');
const through = require('through2');

gulp.task('build', function() {
    return gulp.src('source/**/*.html')
        // 1. HTML 與 CSS 基礎壓縮
        .pipe(htmlmin({ 
            collapseWhitespace: true, 
            removeComments: true,
            minifyCSS: true
        }))
        // 2. 針對內嵌 JS 進行「暴力混淆」與「死代碼注入」
        .pipe(through.obj(function(file, enc, cb) {
            if (file.isBuffer()) {
                let content = file.contents.toString();
                content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/g, function(match, jsCode) {
                    if (!jsCode.trim()) return match;
                    
                    try {
                        const obfuscated = obfuscator.obfuscate(jsCode, {
                            compact: true,
                            controlFlowFlattening: true,       // 強力打亂執行順序
                            controlFlowFlatteningThreshold: 1, // 100% 覆蓋
                            deadCodeInjection: true,           // 注入死代碼 (干擾 AI 分析)
                            deadCodeInjectionThreshold: 1,     // 100% 注入
                            stringArray: true,                 // 字串加密
                            stringArrayThreshold: 1,
                            stringArrayEncoding: ['base64'],   // 使用 Base64 編碼字串
                            splitStrings: true,                // 把字串切碎 (例如 "FPS" 變成 "F"+"P"+"S")
                            splitStringsChunkLength: 3,
                            unicodeEscapeSequence: true,       // 關鍵：將所有字符轉為 \uXXXX 碼 (AI 難以直接讀取)
                            identifierNamesGenerator: 'hexadecimal', // 變數名全變 _0xabc123
                            transformObjectKeys: true,         // 連物件屬性名都加密
                            numbersToExpressions: true,        // 數字轉為運算式
                        }).getObfuscatedCode();
                        return `<script>${obfuscated}</script>`;
                    } catch (e) {
                        console.error('混淆失敗:', file.path, e);
                        return match;
                    }
                });
                file.contents = Buffer.from(content);
            }
            cb(null, file);
        }))
        .pipe(gulp.dest('./docs/'))
        .on('end', () => {
            // 3. 處理 Assets (PDF、圖片)，確保 encoding 為 false
            gulp.src('source/assets/**/*', { encoding: false })
                .pipe(gulp.dest('./docs/assets/'));
        });
});