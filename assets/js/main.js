        // Search on enter key event
        function search(e) {
            if (e.keyCode == 13) {
                var val = document.getElementById("search-field").value;
                window.open("https://google.com/search?q=" + val);
            }
        }
        // Get current time and format
        function getTime() {
            let date = new Date(),
                min = date.getMinutes(),
                sec = date.getSeconds(),
                hour = date.getHours();

            return "" + 
                (hour < 10 ? ("0" + hour) : hour) + ":" + 
                (min < 10 ? ("0" + min) : min) + ":" + 
                (sec < 10 ? ("0" + sec) : sec);
        }
		//Get weather data
        window.onload = () => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=faa1492a62a1470ba6a7e348dac6a045');
            xhr.onload = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let json = JSON.parse(xhr.responseText);
                        console.log(json);
						document.getElementById("location").innerHTML = json.HeWeather6[0].basic.location;
                        document.getElementById("temp").innerHTML = json.HeWeather6[0].now.tmp + "摄氏度";
						document.getElementById("weather-description").innerHTML = json.HeWeather6[0].now.cond_txt;
                    } else {
                        console.log('error msg: ' + xhr.status);
                    }
                }
            }
            xhr.send();
            // Set up the clock
            document.getElementById("clock").innerHTML = getTime();
            // Set clock interval to tick clock
            setInterval( () => {
                document.getElementById("clock").innerHTML = getTime();
            },100);
        }
		//Search on Spacebar and Esc key event
        document.addEventListener("keydown", event => {
            if (event.keyCode == 32) {          // Spacebar code to open search
                document.getElementById('search').style.display = 'flex';
                document.getElementById('search-field').focus();
            } else if (event.keyCode == 27) {   // Esc to close search
                document.getElementById('search-field').value = '';
                document.getElementById('search-field').blur();
                document.getElementById('search').style.display = 'none';
            }
        });