"use clieen";

interface TimePickerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  setTime: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ setTime, ...props }) => {
  return (
    <div {...props}>
      <ul
        id="timetable"
        className="grid w-full max-w-[260px] min-h-[220px] grid-cols-3 gap-2 p-3"
      >
        <li>
          <input
            type="radio"
            id="9:00"
            value="9:00"
            onChange={(e) => setTime(e.target.value)}
            className="hidden peer"
            defaultChecked
            name="timetable"
          />
          <label
            htmlFor="9:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            9:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="9:30"
            value="9:30"
            onChange={(e) => setTime(e.target.value)}
            className="hidden peer"
            defaultChecked
            name="timetable"
          />
          <label
            htmlFor="9:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            9:30
          </label>
        </li>

        <li>
          <input
            type="radio"
            id="10-am"
            value="10:00"
            onChange={(e) => setTime(e.target.value)}
            className="hidden peer"
            defaultChecked
            name="timetable"
          />
          <label
            htmlFor="10-am"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            10:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="10:30"
            value="10:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="10:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            10:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="11:00"
            value="11:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="11:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            11:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="11:30"
            value="11:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="11:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            11:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="12:00"
            value="12:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="12:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            12:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="12:30"
            value="12:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="12:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            12:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="13:00"
            value="13:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="13:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            13:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="13:30"
            value="13:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="13:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            13:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="14:00"
            value="14:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="14:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            14:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="14:30"
            value="14:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="14:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            14:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="15:00"
            value="15:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="15:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            15:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="15:30"
            value="15:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="15:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            15:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="16:00"
            value="16:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="16:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            16:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="16:30"
            value="16:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="16:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            16:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="17:00"
            value="17:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="17:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            17:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="17:30"
            value="17:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="17:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            17:30
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="18:00"
            value="18:00"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="18:00"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            18:00
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="18:30"
            value="18:30"
            className="hidden peer"
            onChange={(e) => setTime(e.target.value)}
            name="timetable"
          />
          <label
            htmlFor="18:30"
            className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:bg-muted border border-input rounded-full cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
          >
            18:30
          </label>
        </li>
      </ul>
    </div>
  );
};

export default TimePicker;
