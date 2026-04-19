const monthYear = document.getElementById("monthYear");
const datesContainer = document.getElementById("dates");
const moodPicker = document.getElementById("moodPicker");

let currentDate = new Date();
let selectedDate = null;

// Хранение настроений
const moods = JSON.parse(localStorage.getItem("moods") || "{}");

function formatDateKey(date) {
  return date.toISOString().split("T")[0];
}

function renderCalendar() {
  datesContainer.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleString("ru-RU", {
    month: "long",
    year: "numeric"
  });

  for (let i = 1; i < firstDay; i++) {
    datesContainer.innerHTML += "<div></div>";
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.textContent = day;

    const dateObj = new Date(year, month, day);
    const today = new Date();

    const key = formatDateKey(dateObj);

    // применяем настроение
    if (moods[key]) {
      div.classList.add("mood-" + moods[key]);
    }

    // доступность (только прошлое и сегодня)
    if (dateObj <= today.setHours(0,0,0,0)) {
      div.classList.add("active");

      div.onclick = () => {
        document.querySelectorAll(".dates div").forEach(d => d.classList.remove("selected"));
        div.classList.add("selected");
        selectedDate = key;
        moodPicker.style.display = "block";
      };
    }

    datesContainer.appendChild(div);
  }
}

// выбор настроения
moodPicker.addEventListener("click", (e) => {
  if (!e.target.dataset.mood || !selectedDate) return;

  moods[selectedDate] = e.target.dataset.mood;
  localStorage.setItem("moods", JSON.stringify(moods));

  renderCalendar();
});

document.getElementById("prev").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("next").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();





let work_tesks = document.querySelectorAll('.note:has(.work)')
let work_count_span = document.querySelector('.work.count')

work_count_span.innerHTML = work_tesks.length

let personal_tesks = document.querySelectorAll('.note:has(.personal)')
let personal_count_span = document.querySelector('.personal.count')

personal_count_span.innerHTML = personal_tesks.length


function addNote(){
    const title_task = document.getElementById('inputTitle');
    const title_txt = title_task.value.trim();
    const type_task = document.getElementById('noteTag').value

    if (title_txt === "") return;
    
    const note = document.createElement('div');
    note.classList = 'note';
    note.textContent = title_txt;
    const tag = document.createElement('div')
    tag.classList.add('tag', type_task)
    const typeTag = {
        work : 'Work',
        persoanl: 'Personal'
    }
    note.appendChild(tag)
    tag.textContent = typeTag[type_task]
    document.querySelector('.tasks').appendChild(note);
    title_task.value = '';

}