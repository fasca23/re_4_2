import { useState } from "react";
import Form from "./Form";
import List from "./List";

export default function Container() {
  const dayNow = new Date()
  const [form, setForm] = useState({
    date: `${dayNow.getFullYear()}-${dayNow.getMonth()+1}-${dayNow.getDate()}`,
    path: "10",
  });

  const [list, setList] = useState([]);

  const onChange = (e) => {
    e.target.value = e.target.value.replace(",", ".");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
// убиваем стандартное поведение, чтоб страницу не перезагружал
    e.preventDefault();
// Если ничего не ввел - кина не будет....
    if (!form.date || !form.path) return;
// если вводим числа только - обновляем и чистим строку
    if (/[^0-9.]/.test(form.path)) {
      setForm((prev) => ({ ...prev, path: "" }));
      return;
    }

    setList((prev) => {
      let copy = [...prev.map((workout) => ({ ...workout }))];
      
// или просто добавляем если нет такой даты или складываем часы к уже имеющейся 
      if (!prev.find((item) => item.date === form.date)) {
        copy.push(form);
      } else {
        const itemToChange = copy.find((item) => item.date === form.date);

        itemToChange.path = "" + (+itemToChange.path + +form.path);
      }

      return copy.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });

    setForm((prev) => ({ ...prev, date: "", path: "" }));
  };

  // удаляем элемент массива - фильтруя массив, исключая удаляемый
  const onDelWorkout = (item) => {
    setList((prev) => [...prev].filter((workout) => workout !== item));
  };

  const onEditWorkout = (item) => {
    setForm((prev) => ({ ...prev, date: item.date, path: item.path }));
  };

  return (
    <div className="workout-box">
      <Form form={form} onFormChange={onChange} onFormSubmit={onSubmit} />

      <List
        workouts={list}
        onDelClick={onDelWorkout}
        onEditClick={onEditWorkout}
      />
    </div>
  );
}