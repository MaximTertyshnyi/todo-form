import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./TaskInput.scss";

export const TaskInput = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [inputFontSize, setInputFontSize] = useState(1.5);
  const inputRef = useRef(null);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "60px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNewTask(value);

    const inputLength = value.length;
    if (inputLength > 50) {
      setInputFontSize(1);
    } else if (inputLength > 25) {
      setInputFontSize(1.2);
    } else {
      setInputFontSize(1.5);
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onAddTask(newTask);
    if (success) {
      setNewTask("");
    }
  };

  return (
    <div className="TaskInput">
      <ChevronDown className="TaskInput__chevron" />
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            ref={inputRef}
            value={newTask}
            onChange={handleChange}
            className="TaskInput__input"
            placeholder="What needs to be done?"
            style={{ fontSize: `${inputFontSize}rem`, height: "0px" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className={`TaskInput__add-button ${
              newTask.trim() ? "active" : ""
            }`}
            disabled={!newTask.trim()}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
