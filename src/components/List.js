import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export default function List(props) {
  const { workouts, onDelClick, onEditClick } = props;

  function formatDate(date) {
    return `${date.split("-")[2]}.${date.split("-")[1]}.${date.split("-")[0]}`;
  }

  return (
    <div className="workout-list">
      <div className="workout-list_titles">
        <span>Дата</span>
        <span>Просижено, часов</span>
        <span>Добавить/Удалить</span>
      </div>

      <div className="workout-list_items">
        {workouts.map((workout) => (
          <div className="workout-item" key={nanoid()}>
            <div>{formatDate(workout.date)}</div>
            <div>{workout.path}</div>
            <div className="workout-item_actions">
              <i
                className="material-icons edit-action"
                onClick={() => onEditClick(workout)}
              >
                add_circle
              </i>
              <i
                className="material-icons del-action"
                onClick={() => onDelClick(workout)}
              >
                delete_forever
              </i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

List.propTypes = {
  workouts: PropTypes.array,
};