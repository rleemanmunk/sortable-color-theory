var saturation = 50;
var lightness = 50;
function setup() {
    var numColors = 20;
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    var items = $("li");
    $.each(items, function(idx, item) {
        var hue = getRandHue(numColors);
        $(item).data("hue", hue);
        setBackgroundColor(item, hue);
    });
    setupSaturationSlider();
    setupLightnessSlider();
    $(".settingsBtn").on("click", function (ev) {
    });
};

function setupSaturationSlider() {
    setupSlider(
            "#saturation-slider", 
            "#saturationVal", 
            function (val) {
                saturation = val;
            });
};

function setupLightnessSlider() {
    setupSlider(
            "#lightness-slider", 
            "#lightnessVal", 
            function (val) {
                lightness = val;
            });
};

function setupSlider(sliderId, valId, slideFunction) {
    var satSlide = $( sliderId );
    satSlide.slider({
        range: "max",
        min: 0,
        max: 100,
        step: 5,
        value: saturation,
        slide: function( event, ui ) {
            $( valId ).text( ui.value );
            slideFunction(ui.value);
            updateBackgroundColor();
        }
    });
    $( valId ).text( satSlide.slider( "value" ) );
};

function updateBackgroundColor() {
    $.each($("li"), function(idx, item) {
        var hue = $(item).data("hue");
        setBackgroundColor(item, hue);
    });
};

function setBackgroundColor(item, hue) {
    var color = buildHsl(hue, saturation, lightness);
    $(item).css("background-color", color)
};

function getRandIdx(numColors) {
    return Math.floor(Math.random() * numColors);
};

function getRandHue(numColors) {
    var idx = getRandIdx(numColors);
    return (360/numColors)*idx; 
};

function buildHsl(hue, saturation, lightness) {
    return "hsl("+hue+","+saturation+"%,"+lightness+"%)";
};
