(function () {

  var jqPlotWidget = function (settings) {

    var self = this;    
    var currentSettings = settings;
    var htmlElement;
    var data;
    var options;
    
    //seems to be called once (or after settings change)
    this.render = function (element) {
     var chartDiv = '<div id="' + currentSettings.id + '" style="height:' + currentSettings.chartHeight + 'px;width:' + currentSettings.chartWidth + 'px;"></div>';
      htmlElement = $(chartDiv);
	  $(element).replaceWith(htmlElement)
	}
	

    this.onSettingsChanged = function (newSettings) {
	   currentSettings = newSettings;
	  this.render(document.getElementById(currentSettings.id))
	}

    //seems to be called after render whenever a calculated value changes
    this.onCalculatedValueChanged = function (settingName, newValue) {
      if (settingName == 'data')
        data = newValue;
        
      if (settingName == 'options')
        options = newValue;

      htmlElement.empty();
      $.jqplot(currentSettings.id, data, options);
	  var styleSheet = '<link rel="stylesheet" href="plugins/thirdparty/jqplot/jquery.jqplot.css" />';
	  styleElement = $(styleSheet)
      htmlElement.prepend(styleElement)
	}

    this.onDispose = function () {
    }

    this.getHeight = function () {
      return Number(currentSettings.height);
    }

   };

  freeboard.loadWidgetPlugin({
    "type_name": "jqPlotWidget",
    "display_name": "jqPlot",    
    "fill_size": true,
    "external_scripts": [
	  "plugins/thirdparty/jqplot/jquery.jqplot.js",
	  "plugins/thirdparty/jqplot/excanvas.js",
	  "plugins/thirdparty/jqplot/jquery.jqplot.css",
	  "plugins/thirdparty/jqplot/plugins/jqplot.barRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.BezierCurveRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.blockRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.bubbleRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.canvasAxisLabelRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.canvasAxisTickRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.canvasOverlay.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.canvasTextRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.categoryAxisRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.ciParser.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.cursor.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.dateAxisRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.donutRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.dragable.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.enhancedLegendRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.enhancedPieLegendRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.funnelRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.highlighter.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.highlightingCursor.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.json2.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.logAxisRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.mekkoAxisRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.mekkoRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.meterGaugeRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.mobile.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.ohlcRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.pieRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.pointLabels.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.pyramidAxisRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.pyramidGridRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.pyramidRenderer.js",
	  "plugins/thirdparty/jqplot/plugins/jqplot.trendline.js"
	  ],    
    "settings": [
      {
        "name": "id",
        "display_name": "id",
        "default_value": "chart1",
        "description": "dom element id of the chart (must be unique for multiple charts)"
      },        
      {
        "name": "data",
        "display_name": "Chart Data",
        "type": "calculated",
        "description": "The data to plot"
      },    
      {
        "name": "options",
        "display_name": "Chart Options",
        "type": "calculated",
        "description": "js object containing jqPlot options for chart"
      },
      {
        "name": "chartHeight",
        "display_name": "Chart Height (px)",
        "type": "number",
        "default_value": 300,
        "description": "chart height in pixels"
      },
      {
        "name": "chartWidth",
        "display_name": "Chart Widgth (px)",
        "type": "number",
        "default_value": 300,
        "description": "chart width in pixels"
      },      
      {
        "name": "height",
        "display_name": "Height Blocks",
        "type": "number",
        "default_value": 5,
        "description": "A height block is around 60 pixels"
      }
    ],
    newInstance: function (settings, newInstanceCallback) {
      newInstanceCallback(new jqPlotWidget(settings));
    }
  });

}());