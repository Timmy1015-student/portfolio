const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

// 1. 強力壓縮任務
gulp.task('minify-html', function() {
    return gulp.src('source/**/*.html')
        .pipe(htmlmin({ 
            collapseWhitespace: true,      // 壓縮成一行
            removeComments: true,         // 移除註解
            minifyJS: true,               // 壓縮 script 標籤
            minifyCSS: true,              // 壓縮 style 標籤
            collapseInlineTagWhitespace: true 
        }))
        .pipe(gulp.dest('./docs/'));
});

// 2. 修正後的資源複製任務 (解決 PDF/圖片不見的問題)
gulp.task('copy-assets', function() {
    // 抓取 source/assets 裡的所有東西，直接丟進 docs/assets
    return gulp.src('source/assets/**/*')
        .pipe(gulp.dest('./docs/assets/'));
});

// 3. 執行 build 時，按順序跑上面兩個
gulp.task('build', gulp.series('minify-html', 'copy-assets'));