// ******* Exercise 4 - Digital Clock *******
let n1 = setInterval(function () {
  // Clock
  let date1 = new Date();
  let h = date1.getHours();
  let m = date1.getMinutes();
  m = Number.parseInt(m);
  let s = date1.getSeconds();
  s = Number.parseInt(s);
  let hours12 = h % 12 || 12; // Handle midnight (0) as 12
  hours12 = Number.parseInt(hours12);
  let ampm = h >= 12 ? "pm" : "am";
  let d = date1.getDate();
  let dayName = date1.toLocaleDateString("default", { weekday: "long" });
  let mo = date1.getMonth() + 1;
  const monthName = date1.toLocaleString("default", { month: "long" });
  let y = date1.getFullYear();
  console.log(h, m, s, d, mo, monthName, dayName, y);

  document.getElementById("hours").innerHTML = hours12;
  document.getElementById("minutes").innerHTML = m;
  document.getElementById("seconds").innerHTML = s;
  document.getElementById("am-pm").innerHTML = ampm;
  document.getElementById("day_name").innerHTML = dayName;
  document.getElementById("month").innerHTML = mo;
  document.getElementById("month_name").innerHTML = monthName;
  document.getElementById("year").innerHTML = y;

  // alarm
  const a_hours = document.getElementById("hour");
  const a_minute = document.getElementById("minute");
  const a_reflect_time = document.querySelector(".setted_time p");
  const a_set_timer = document.getElementById("set_timer");
  const a_clear = document.getElementById("clear_timer");
  const sound = document.getElementById("alarm-sound");

  a_set_timer.addEventListener("click", () => {
    const selectedHour = parseInt(a_hours.value);
    const selectedminute = parseInt(a_minute.value);

	// Generated Start by ChatGPT
    const formateAlarmTime = `${selectedHour
		.toString()
		.padStart(2, "0")}:${selectedminute.toString().padStart(2, "0")}`;
		
		a_reflect_time.textContent = `Alarm Time : ${formateAlarmTime}`;
		const secondRem =
		selectedHour * 3600 + selectedminute * 60 - (hours12 * 3600 + m * 60 + s);
		const actualSecondRem = secondRem < 0 ? secondRem + 12 * 3600 : secondRem;
		setTimeout(() => {
			sound.play();
		}, actualSecondRem * 1000);
	});
	// Generated End by ChatGPT

  a_clear.addEventListener("click", () => {
    a_hours.value = "";
    a_minute.value = "";
    a_reflect_time.textContent = "";
    console.log("Alarm Reset");
  });
}, 1000);
