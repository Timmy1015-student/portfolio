const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

// 1. 壓縮 HTML 並轉碼
gulp.task('minify-html', function() {
    return gulp.src('source/**/*.html')
        .pipe(htmlmin({ 
            collapseWhitespace: true, 
            removeComments: true,
            minifyJS: true, 
            minifyCSS: true 
        }))
        .pipe(gulp.dest('./docs/'));
});

// 2. 自動把圖片、PDF 搬到 docs，確保網頁讀得到
gulp.task('copy-assets', function() {
    return gulp.src('source/assets/**/*')
        .pipe(gulp.dest('./docs/assets/'));
});

// 3. 執行「build」時，同時跑上面兩個任務
gulp.task('build', gulp.series('minify-html', 'copy-assets'));