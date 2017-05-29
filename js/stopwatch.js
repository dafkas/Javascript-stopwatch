
//starttijd maken, rondetijd maken en tijd die weergeven word als er op stop word gedrukt
var stopwatch = function () {
    var startTijd = 0;
    var rondeTijd = 0;
    var now = function () {
        return (new Date()).getTime();
    }; 

//start functie
    this.start = function () {
        if(startTijd)
        {
            startTijd = starTijd;
        }
        else
        {
            startTijd = now();
        }
    }
// reset tijd naar 00:00:000
    this.reset = function () {
        rondeTijd = startTijd = 0;
    }
    
    this.pause = function(){
		rondeTijd	= startTijd ? rondeTijd + now() - startTijd : rondeTijd;
		startTijd	= 0; // Paused
    }
    
//tijd weergeven
    this.time = function () {
        return rondeTijd + (startTijd ? now() - startTijd : 0);
    }
}

// variables tijd en kloktijd aanmaken
var i = new stopwatch();
var $time;
var kloktijd;

// lengte van stopwatch tijd maken
function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

// manier waarop de tijd word weergeven : 00:00:000
function formatTijd(time)
{
    var h = m = s = ms = 0;
    var nieuwTijd = "";
    
    h = Math.floor( time / (60 * 60 * 1000));
    time = time % (60 * 60 * 1000);
    m = Math.floor ( time / ( 60 *1000));
    time = time % (60 *1000);
    s = Math.floor( time / 1000);
    ms = time % 1000;
    
    nieuwTijd = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
    return nieuwTijd;
}

// tijd laten zien
function show() {
    $time = document.getElementById('tijd');
    update();
}

// tijd updaten dus elke keer een erbij
function update() {
    $time.innerHTML = formatTijd(i.time());
}

//start tijd en elke keer 1 updaten
function start() {
    
    var x = document.getElementById('start');
    	kloktijd = setInterval("update(), 1");
		i.start();
    }

// functie stop om de tijd te stoppen en te laten zien hoeveel het is
function pause(){
	
	i.pause();
    clearTimeout(kloktijd);
}


// reset functie dus tijd + laps resetten
function reset(){
    stop();
    i.reset();
    document.getElementById('lap').innerHTML = "";
    update();
    
}
// lap weergeven hoeveel de tijd is wanneer er op de button lap word geklikt
function lap() {
    var secondContent = document.getElementById('tijd');
    
    firstContent.innerHTML += secondContent.innerHTML +  "<br/>";
    
}