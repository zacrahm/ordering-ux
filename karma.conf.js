module.exports = function(config) {
  config.set({
    basePath : './',
    files : [
      'dist/vendor.js',
      'dist/ordering.tool.1.0.0.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/**/*.js'
    ],
    frameworks : ['jasmine'],
    autoWatch : false,
    browsers : ["PhantomJS", "Chrome"],
    reporters : ['progress', 'junit'],
    singleRun : true,
    plugins : [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-junit-reporter',
      'karma-chrome-launcher'
    ],
    junitReporter : {
      outputFile : 'test-results.xml',
      suite : 'unit'
    }
  });
};