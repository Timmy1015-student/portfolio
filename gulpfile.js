const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const obfuscator = require('javascript-obfuscator'); // 注意：這裡改用核心版
const through = require('through2'); // 用來攔截並修改檔案流

gulp.task('build', function() {
    return gulp.src('source/**/*.html')
        // 第一步：暴力壓縮 HTML 與 CSS
        .pipe(htmlmin({ 
            collapseWhitespace: true, 
            removeComments: true,
            minifyCSS: true
        }))
        // 第二步：攔截 HTML，尋找並「攪亂」裡面的 JavaScript 順序
        .pipe(through.obj(function(file, enc, cb) {
            if (file.isBuffer()) {
                let content = file.contents.toString();
                // 正則表達式：抓取 <script> 標籤內的內容
                content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/g, function(match, jsCode) {
                    if (!jsCode.trim()) return match;
                    
                    // 執行最高等級混淆：控制流扁平化 (核心打亂技術)
                    const obfuscated = obfuscator.obfuscate(jsCode, {
                        compact: true,
                        controlFlowFlattening: true,       // 關鍵：將 if/else 改寫成亂序 switch
                        controlFlowFlatteningThreshold: 1, // 100% 覆蓋打亂
                        numbersToExpressions: true,        // 數字變算式 (1 變成 0x5a-0x59)
                        stringArray: true,                 // 字串加密
                        rotateStringArray: true,
                        shuffleStringArray: true,
                        identifierNamesGenerator: 'mangled' // 變數名縮短
                    }).getObfuscatedCode();

                    return `<script>${obfuscated}</script>`;
                });
                file.contents = Buffer.from(content);
            }
            cb(null, file);
        }))
        .pipe(gulp.dest('./docs/'))
        .on('end', () => {
            // 複製資產
            gulp.src('source/assets/**/*', { encoding: false }).pipe(gulp.dest('./docs/assets/'));
        });
});