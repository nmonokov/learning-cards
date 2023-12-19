import { useDarkMode } from './DarkModeContext';
import './DarkModeToggle.css';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleChange = () => {
    toggleDarkMode();
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle_checkbox"
        checked={isDarkMode}
        onChange={handleChange}
      />
      <label htmlFor="toggle_checkbox">
        <div id="star"></div>
        <div id="moon"></div>
      </label>
    </>
  );
};

export default DarkModeToggle;
