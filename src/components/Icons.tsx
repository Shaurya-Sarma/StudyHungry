import Svg, { Path } from "react-native-svg";
import { TimerContext } from "../contexts/TimerContext";
import { useContext } from "react";

export const PomodoroIcon = (props: {
  size: number;
  fillColor: string;
  isFocused: boolean;
}) => {
  return (
    <Svg width={props.size} height={props.size}>
      {(() => {
        return props.isFocused ? (
          <Path
            d="M20 18.333c1.833 0 3.403-.652 4.708-1.958 1.306-1.306 1.959-2.875 1.959-4.708v-5H13.333v5c0 1.833.653 3.402 1.959 4.708 1.305 1.305 2.875 1.958 4.708 1.958Zm11.667 18.334H8.333c-.472 0-.868-.16-1.188-.48A1.611 1.611 0 0 1 6.667 35c0-.472.16-.868.478-1.187.32-.32.716-.48 1.188-.48H10v-5c0-1.694.396-3.285 1.188-4.771A9.283 9.283 0 0 1 14.5 20a9.28 9.28 0 0 1-3.312-3.563A9.985 9.985 0 0 1 10 11.667v-5H8.333c-.472 0-.868-.16-1.188-.48A1.611 1.611 0 0 1 6.667 5c0-.472.16-.868.478-1.188.32-.32.716-.479 1.188-.479h23.334c.472 0 .867.16 1.186.479.32.32.48.716.48 1.188s-.16.868-.48 1.187c-.319.32-.714.48-1.186.48H30v5a9.997 9.997 0 0 1-1.187 4.77A9.293 9.293 0 0 1 25.5 20a9.296 9.296 0 0 1 3.313 3.562A10.007 10.007 0 0 1 30 28.333v5h1.667c.472 0 .867.16 1.186.48.32.32.48.715.48 1.187 0 .472-.16.868-.48 1.187-.319.32-.714.48-1.186.48Z"
            fill={props.fillColor}
          />
        ) : (
          <Path
            d="M13.333 33.333h13.334v-5c0-1.833-.653-3.402-1.959-4.708-1.305-1.306-2.875-1.958-4.708-1.958-1.833 0-3.403.652-4.708 1.958-1.306 1.305-1.959 2.875-1.959 4.708v5Zm6.667-15c1.833 0 3.403-.652 4.708-1.958 1.306-1.306 1.959-2.875 1.959-4.708v-5H13.333v5c0 1.833.653 3.402 1.959 4.708 1.305 1.305 2.875 1.958 4.708 1.958Zm11.667 18.334H8.333c-.472 0-.868-.16-1.188-.48A1.611 1.611 0 0 1 6.667 35c0-.472.16-.868.478-1.187.32-.32.716-.48 1.188-.48H10v-5c0-1.694.396-3.285 1.188-4.771A9.283 9.283 0 0 1 14.5 20a9.28 9.28 0 0 1-3.312-3.563A9.986 9.986 0 0 1 10 11.667v-5H8.333c-.472 0-.868-.16-1.188-.48A1.611 1.611 0 0 1 6.667 5c0-.472.16-.868.478-1.188.32-.32.716-.479 1.188-.479h23.334c.472 0 .867.16 1.186.479.32.32.48.716.48 1.188s-.16.868-.48 1.187c-.319.32-.714.48-1.186.48H30v5a9.997 9.997 0 0 1-1.187 4.77A9.293 9.293 0 0 1 25.5 20a9.296 9.296 0 0 1 3.313 3.562A10.007 10.007 0 0 1 30 28.333v5h1.667c.472 0 .867.16 1.186.48.32.32.48.715.48 1.187 0 .472-.16.868-.48 1.187-.319.32-.714.48-1.186.48Z"
            fill={props.fillColor}
          />
        );
      })()}
    </Svg>
  );
};

export const AgendaIcon = (props: {
  size: number;
  fillColor: string;
  isFocused: boolean;
}) => {
  return (
    <Svg width={props.size} height={props.size}>
      {(() => {
        return props.isFocused ? (
          <Path
            d="M8.333 35a3.214 3.214 0 0 1-2.355-.978A3.214 3.214 0 0 1 5 31.667V8.333c0-.916.326-1.701.978-2.355A3.214 3.214 0 0 1 8.333 5h23.334c.916 0 1.701.326 2.355.978.652.654.978 1.439.978 2.355v23.334c0 .916-.326 1.701-.978 2.355a3.214 3.214 0 0 1-2.355.978H8.333Zm5-6.667c.473 0 .869-.16 1.189-.48.319-.319.478-.714.478-1.186 0-.473-.16-.869-.478-1.189A1.617 1.617 0 0 0 13.333 25c-.472 0-.868.16-1.188.478-.319.32-.478.716-.478 1.189 0 .472.16.867.478 1.186.32.32.716.48 1.188.48Zm0-6.666c.473 0 .869-.16 1.189-.48.319-.32.478-.715.478-1.187 0-.472-.16-.868-.478-1.188a1.617 1.617 0 0 0-1.189-.479c-.472 0-.868.16-1.188.479-.319.32-.478.716-.478 1.188s.16.868.478 1.187c.32.32.716.48 1.188.48Zm0-6.667c.473 0 .869-.16 1.189-.48.319-.319.478-.714.478-1.187 0-.472-.16-.868-.478-1.188a1.617 1.617 0 0 0-1.189-.478c-.472 0-.868.16-1.188.478-.319.32-.478.716-.478 1.188 0 .473.16.868.478 1.187.32.32.716.48 1.188.48ZM20 28.333h6.667c.472 0 .867-.16 1.186-.48.32-.319.48-.714.48-1.186 0-.473-.16-.869-.48-1.189A1.611 1.611 0 0 0 26.667 25H20c-.472 0-.868.16-1.187.478-.32.32-.48.716-.48 1.189 0 .472.16.867.48 1.186.32.32.715.48 1.187.48Zm0-6.666h6.667c.472 0 .867-.16 1.186-.48.32-.32.48-.715.48-1.187 0-.472-.16-.868-.48-1.188a1.611 1.611 0 0 0-1.186-.479H20c-.472 0-.868.16-1.187.479-.32.32-.48.716-.48 1.188s.16.868.48 1.187c.32.32.715.48 1.187.48ZM20 15h6.667c.472 0 .867-.16 1.186-.48.32-.319.48-.714.48-1.187 0-.472-.16-.868-.48-1.188a1.611 1.611 0 0 0-1.186-.478H20c-.472 0-.868.16-1.187.478-.32.32-.48.716-.48 1.188 0 .473.16.868.48 1.187.32.32.715.48 1.187.48Z"
            fill={props.fillColor}
          />
        ) : (
          <Path
            d="M8.333 35a3.214 3.214 0 0 1-2.355-.978A3.214 3.214 0 0 1 5 31.667V8.333c0-.916.326-1.701.978-2.355A3.214 3.214 0 0 1 8.333 5h23.334c.916 0 1.701.326 2.355.978.652.654.978 1.439.978 2.355v23.334c0 .916-.326 1.701-.978 2.355a3.214 3.214 0 0 1-2.355.978H8.333Zm0-3.333h23.334V8.333H8.333v23.334Zm5-3.334c.473 0 .869-.16 1.189-.48.319-.319.478-.714.478-1.186 0-.473-.16-.869-.478-1.189A1.617 1.617 0 0 0 13.333 25c-.472 0-.868.16-1.188.478-.319.32-.478.716-.478 1.189 0 .472.16.867.478 1.186.32.32.716.48 1.188.48Zm0-6.666c.473 0 .869-.16 1.189-.48.319-.32.478-.715.478-1.187 0-.472-.16-.868-.478-1.188a1.617 1.617 0 0 0-1.189-.479c-.472 0-.868.16-1.188.479-.319.32-.478.716-.478 1.188s.16.868.478 1.187c.32.32.716.48 1.188.48Zm0-6.667c.473 0 .869-.16 1.189-.48.319-.319.478-.714.478-1.187 0-.472-.16-.868-.478-1.188a1.617 1.617 0 0 0-1.189-.478c-.472 0-.868.16-1.188.478-.319.32-.478.716-.478 1.188 0 .473.16.868.478 1.187.32.32.716.48 1.188.48ZM20 28.333h6.667c.472 0 .867-.16 1.186-.48.32-.319.48-.714.48-1.186 0-.473-.16-.869-.48-1.189A1.611 1.611 0 0 0 26.667 25H20c-.472 0-.868.16-1.187.478-.32.32-.48.716-.48 1.189 0 .472.16.867.48 1.186.32.32.715.48 1.187.48Zm0-6.666h6.667c.472 0 .867-.16 1.186-.48.32-.32.48-.715.48-1.187 0-.472-.16-.868-.48-1.188a1.611 1.611 0 0 0-1.186-.479H20c-.472 0-.868.16-1.187.479-.32.32-.48.716-.48 1.188s.16.868.48 1.187c.32.32.715.48 1.187.48ZM20 15h6.667c.472 0 .867-.16 1.186-.48.32-.319.48-.714.48-1.187 0-.472-.16-.868-.48-1.188a1.611 1.611 0 0 0-1.186-.478H20c-.472 0-.868.16-1.187.478-.32.32-.48.716-.48 1.188 0 .473.16.868.48 1.187.32.32.715.48 1.187.48ZM8.333 31.667V8.333v23.334Z"
            fill={props.fillColor}
          />
        );
      })()}
    </Svg>
  );
};

export const TutorialsIcon = (props: {
  size: number;
  fillColor: string;
  isFocused: boolean;
}) => {
  return (
    <Svg width={props.size} height={props.size}>
      {(() => {
        return props.isFocused ? (
          <Path
            d="m18.417 25.833 6.916-4.416c.528-.334.792-.806.792-1.417s-.264-1.083-.792-1.417l-6.916-4.416c-.556-.39-1.125-.417-1.709-.084-.583.334-.875.82-.875 1.459v8.916c0 .64.292 1.125.875 1.459.584.333 1.153.305 1.709-.084Zm-11.75 7.5a3.209 3.209 0 0 1-2.354-.978A3.211 3.211 0 0 1 3.333 30V10c0-.917.327-1.701.98-2.353a3.206 3.206 0 0 1 2.354-.98h26.666c.917 0 1.702.326 2.355.98.652.652.979 1.436.979 2.353v20c0 .917-.327 1.702-.979 2.355a3.214 3.214 0 0 1-2.355.978H6.667Z"
            fill={props.fillColor}
          />
        ) : (
          <Path
            d="m18.417 25.833 6.916-4.416c.528-.306.792-.778.792-1.417s-.264-1.111-.792-1.417l-6.916-4.416c-.556-.361-1.125-.39-1.709-.084-.583.306-.875.792-.875 1.459v8.916c0 .667.292 1.153.875 1.459.584.305 1.153.277 1.709-.084Zm-11.75 7.5a3.209 3.209 0 0 1-2.354-.978A3.211 3.211 0 0 1 3.333 30V10c0-.917.327-1.701.98-2.353a3.206 3.206 0 0 1 2.354-.98h26.666c.917 0 1.702.326 2.355.98.652.652.979 1.436.979 2.353v20c0 .917-.327 1.702-.979 2.355a3.214 3.214 0 0 1-2.355.978H6.667Zm0-3.333V10v20Zm0 0h26.666V10H6.667v20Z"
            fill={props.fillColor}
          />
        );
      })()}
    </Svg>
  );
};

export const LogbookIcon = (props: {
  size: number;
  fillColor: string;
  isFocused: boolean;
}) => {
  return (
    <Svg width={props.size} height={props.size}>
      {(() => {
        return props.isFocused ? (
          <Path
            d="M23.333 14.625c0-.25.09-.507.272-.772.18-.263.381-.436.603-.52a15.457 15.457 0 0 1 2.417-.625 14.947 14.947 0 0 1 2.542-.208c.555 0 1.104.034 1.646.103.542.07 1.076.16 1.604.272.25.056.465.194.645.417.18.222.271.472.271.75 0 .472-.152.82-.458 1.041-.306.223-.694.278-1.167.167a10.992 10.992 0 0 0-1.228-.188A13.832 13.832 0 0 0 29.167 15c-.723 0-1.43.07-2.125.208-.695.14-1.361.32-2 .542-.5.194-.91.18-1.229-.042-.32-.222-.48-.583-.48-1.083Zm0 9.167c0-.25.09-.508.272-.772.18-.263.381-.437.603-.52a15.468 15.468 0 0 1 2.417-.625 14.947 14.947 0 0 1 2.542-.208c.555 0 1.104.034 1.646.103.542.07 1.076.16 1.604.272.25.055.465.194.645.416.18.223.271.473.271.75 0 .473-.152.82-.458 1.042-.306.222-.694.278-1.167.167a10.992 10.992 0 0 0-1.228-.189 13.799 13.799 0 0 0-1.313-.061c-.723 0-1.43.063-2.125.188-.695.125-1.361.298-2 .52-.5.195-.91.187-1.229-.022-.32-.207-.48-.561-.48-1.061Zm0-4.584c0-.25.09-.507.272-.771.18-.264.381-.437.603-.52a15.468 15.468 0 0 1 2.417-.625 14.947 14.947 0 0 1 2.542-.209c.555 0 1.104.035 1.646.104.542.07 1.076.16 1.604.271.25.056.465.195.645.417.18.222.271.472.271.75 0 .472-.152.82-.458 1.042-.306.222-.694.277-1.167.166a10.968 10.968 0 0 0-1.228-.188 13.832 13.832 0 0 0-1.313-.062c-.723 0-1.43.07-2.125.209-.695.139-1.361.32-2 .541-.5.195-.91.18-1.229-.041-.32-.223-.48-.584-.48-1.084Zm-1.666 9.209a18.357 18.357 0 0 1 3.688-1.314 16.56 16.56 0 0 1 3.812-.436c1 0 1.98.083 2.938.25.958.166 1.923.416 2.895.75v-16.5a14.44 14.44 0 0 0-2.853-.875 15.292 15.292 0 0 0-6.855.208 14.28 14.28 0 0 0-3.625 1.5v16.417ZM20 32.458c-.389 0-.757-.048-1.103-.145a4.687 4.687 0 0 1-.98-.396A13.608 13.608 0 0 0 14.5 30.48a14.107 14.107 0 0 0-3.667-.48c-1.166 0-2.312.153-3.436.458a15.077 15.077 0 0 0-3.23 1.292c-.584.306-1.146.292-1.687-.042-.542-.333-.813-.82-.813-1.458V10.167c0-.306.076-.598.23-.875.152-.278.38-.486.686-.625a17.39 17.39 0 0 1 4-1.5c1.39-.334 2.806-.5 4.25-.5 1.611 0 3.188.208 4.73.625A17.97 17.97 0 0 1 20 9.167a17.964 17.964 0 0 1 4.438-1.875 18.036 18.036 0 0 1 4.729-.625c1.444 0 2.86.166 4.25.5 1.389.333 2.722.833 4 1.5.305.139.535.347.688.625.152.277.228.57.228.875V30.25c0 .639-.27 1.125-.811 1.458-.542.334-1.105.348-1.689.042a15.079 15.079 0 0 0-3.23-1.292A13.047 13.047 0 0 0 29.167 30c-1.25 0-2.473.16-3.667.48a13.609 13.609 0 0 0-3.417 1.437 4.7 4.7 0 0 1-.978.396 4.112 4.112 0 0 1-1.105.145Z"
            fill={props.fillColor}
          />
        ) : (
          <Path
            d="M23.333 14.625c0-.25.09-.507.272-.772.18-.263.381-.436.603-.52a15.457 15.457 0 0 1 2.417-.625 14.947 14.947 0 0 1 2.542-.208c.555 0 1.104.034 1.646.103.542.07 1.076.16 1.604.272.25.056.465.194.645.417.18.222.271.472.271.75 0 .472-.152.82-.458 1.041-.306.223-.694.278-1.167.167a10.992 10.992 0 0 0-1.228-.188A13.832 13.832 0 0 0 29.167 15c-.723 0-1.43.07-2.125.208-.695.14-1.361.32-2 .542-.5.194-.91.18-1.229-.042-.32-.222-.48-.583-.48-1.083Zm0 9.167c0-.25.09-.508.272-.772.18-.263.381-.437.603-.52a15.468 15.468 0 0 1 2.417-.625 14.947 14.947 0 0 1 2.542-.208c.555 0 1.104.034 1.646.103.542.07 1.076.16 1.604.272.25.055.465.194.645.416.18.223.271.473.271.75 0 .473-.152.82-.458 1.042-.306.222-.694.278-1.167.167a10.992 10.992 0 0 0-1.228-.189 13.799 13.799 0 0 0-1.313-.061c-.723 0-1.43.063-2.125.188-.695.125-1.361.298-2 .52-.5.195-.91.187-1.229-.022-.32-.207-.48-.561-.48-1.061Zm0-4.584c0-.25.09-.507.272-.771.18-.264.381-.437.603-.52a15.468 15.468 0 0 1 2.417-.625 14.947 14.947 0 0 1 2.542-.209c.555 0 1.104.035 1.646.104.542.07 1.076.16 1.604.271.25.056.465.195.645.417.18.222.271.472.271.75 0 .472-.152.82-.458 1.042-.306.222-.694.277-1.167.166a10.968 10.968 0 0 0-1.228-.188 13.832 13.832 0 0 0-1.313-.062c-.723 0-1.43.07-2.125.209-.695.139-1.361.32-2 .541-.5.195-.91.18-1.229-.041-.32-.223-.48-.584-.48-1.084Zm-12.5 7.459c1.306 0 2.577.145 3.814.436a18.37 18.37 0 0 1 3.686 1.314V12a14.28 14.28 0 0 0-3.625-1.5 15.293 15.293 0 0 0-6.853-.208c-.987.194-1.938.486-2.855.875v16.5a18.922 18.922 0 0 1 2.897-.75c.957-.167 1.936-.25 2.936-.25Zm10.834 1.75a18.357 18.357 0 0 1 3.688-1.314 16.56 16.56 0 0 1 3.812-.436c1 0 1.98.083 2.938.25.958.166 1.923.416 2.895.75v-16.5a14.44 14.44 0 0 0-2.853-.875 15.292 15.292 0 0 0-6.855.208 14.28 14.28 0 0 0-3.625 1.5v16.417ZM20 32.458c-.389 0-.757-.048-1.103-.145a4.687 4.687 0 0 1-.98-.396A13.608 13.608 0 0 0 14.5 30.48a14.107 14.107 0 0 0-3.667-.48c-1.166 0-2.312.153-3.436.458a15.077 15.077 0 0 0-3.23 1.292c-.584.306-1.146.292-1.687-.042-.542-.333-.813-.82-.813-1.458V10.167c0-.306.076-.598.23-.875.152-.278.38-.486.686-.625a17.391 17.391 0 0 1 4-1.5c1.39-.334 2.806-.5 4.25-.5 1.611 0 3.188.208 4.73.625A17.97 17.97 0 0 1 20 9.167a17.964 17.964 0 0 1 4.438-1.875 18.036 18.036 0 0 1 4.729-.625c1.444 0 2.86.166 4.25.5 1.389.333 2.722.833 4 1.5.305.139.535.347.688.625.152.277.228.57.228.875V30.25c0 .639-.27 1.125-.811 1.458-.542.334-1.105.348-1.689.042a15.079 15.079 0 0 0-3.23-1.292A13.047 13.047 0 0 0 29.167 30c-1.25 0-2.473.16-3.667.48a13.609 13.609 0 0 0-3.417 1.437 4.7 4.7 0 0 1-.978.396 4.112 4.112 0 0 1-1.105.145Z"
            fill={props.fillColor}
          />
        );
      })()}
    </Svg>
  );
};

export const SettingsIcon = (props: { size: number; fillColor: string }) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 46 46">
      <Path
        d="m17.844 41.75-.75-6a7.07 7.07 0 0 1-1.148-.563c-.36-.218-.712-.453-1.055-.703l-5.579 2.344-5.156-8.906 4.828-3.656a4.481 4.481 0 0 1-.046-.634v-1.266c0-.202.015-.413.046-.632l-4.828-3.656 5.157-8.906 5.578 2.344a12.8 12.8 0 0 1 1.078-.704c.375-.218.75-.406 1.125-.562l.75-6h10.312l.75 6c.407.156.79.344 1.15.563.358.218.71.453 1.053.703l5.578-2.344 5.157 8.906-4.828 3.656c.03.22.047.43.047.632v1.266c0 .204-.032.415-.094.634l4.828 3.656-5.156 8.906-5.532-2.344c-.343.25-.703.485-1.078.703-.375.22-.75.407-1.125.563l-.75 6H17.844Zm5.25-12.188c1.812 0 3.36-.64 4.64-1.921 1.282-1.282 1.922-2.828 1.922-4.641 0-1.813-.64-3.36-1.922-4.64-1.28-1.282-2.828-1.922-4.64-1.922-1.844 0-3.399.64-4.665 1.921-1.265 1.282-1.898 2.828-1.898 4.641 0 1.813.633 3.36 1.898 4.64 1.266 1.282 2.821 1.922 4.665 1.922Z"
        fill={props.fillColor}
      />
    </Svg>
  );
};

export const PlayIcon = (props: { size: number; fillColor: string }) => {
  // define timer variables
  const { isTimerEnabled } = useContext(TimerContext);

  return isTimerEnabled ? (
    <Svg width={props.size} height={props.size} viewBox="0 0 40 40">
      <Path
        d="M25 31.6666C24.0833 31.6666 23.2989 31.3405 22.6467 30.6883C21.9933 30.035 21.6667 29.25 21.6667 28.3333V11.6666C21.6667 10.75 21.9933 9.96553 22.6467 9.31331C23.2989 8.65998 24.0833 8.33331 25 8.33331H28.3333C29.25 8.33331 30.035 8.65998 30.6883 9.31331C31.3406 9.96553 31.6667 10.75 31.6667 11.6666V28.3333C31.6667 29.25 31.3406 30.035 30.6883 30.6883C30.035 31.3405 29.25 31.6666 28.3333 31.6666H25ZM11.6667 31.6666C10.75 31.6666 9.96555 31.3405 9.31333 30.6883C8.65999 30.035 8.33333 29.25 8.33333 28.3333V11.6666C8.33333 10.75 8.65999 9.96553 9.31333 9.31331C9.96555 8.65998 10.75 8.33331 11.6667 8.33331H15C15.9167 8.33331 16.7017 8.65998 17.355 9.31331C18.0072 9.96553 18.3333 10.75 18.3333 11.6666V28.3333C18.3333 29.25 18.0072 30.035 17.355 30.6883C16.7017 31.3405 15.9167 31.6666 15 31.6666H11.6667Z"
        fill={props.fillColor}
      />
    </Svg>
  ) : (
    <Svg width={props.size} height={props.size} viewBox="0 0 55 55">
      <Path
        d="M21.84 41.277c-.762.495-1.534.523-2.316.084-.78-.437-1.17-1.113-1.17-2.028V15.667c0-.915.39-1.592 1.17-2.03.782-.438 1.554-.41 2.317.086l18.635 11.833c.686.458 1.03 1.106 1.03 1.944 0 .838-.344 1.486-1.03 1.944L21.841 41.277Z"
        fill={props.fillColor}
      />
    </Svg>
  );
};

export const RestartIcon = (props: { size: number; fillColor: string }) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 46 46">
      <Path
        d="M24.875 22.25L29.5625 26.9375C29.9062 27.2812 30.0781 27.7187 30.0781 28.25C30.0781 28.7812 29.9062 29.2187 29.5625 29.5625C29.2188 29.9062 28.7812 30.0781 28.25 30.0781C27.7188 30.0781 27.2812 29.9062 26.9375 29.5625L21.6875 24.3125C21.5 24.125 21.3594 23.9137 21.2656 23.6787C21.1719 23.445 21.125 23.2031 21.125 22.9531V15.5C21.125 14.9687 21.305 14.5231 21.665 14.1631C22.0238 13.8044 22.4688 13.625 23 13.625C23.5312 13.625 23.9769 13.8044 24.3369 14.1631C24.6956 14.5231 24.875 14.9687 24.875 15.5V22.25ZM23 39.875C19.2188 39.875 15.8281 38.7575 12.8281 36.5225C9.82812 34.2887 7.8125 31.375 6.78125 27.7812C6.625 27.2187 6.68 26.6875 6.94625 26.1875C7.21125 25.6875 7.625 25.375 8.1875 25.25C8.71875 25.125 9.19562 25.2419 9.61812 25.6006C10.0394 25.9606 10.3281 26.4062 10.4844 26.9375C11.2969 29.6875 12.8675 31.9062 15.1962 33.5937C17.5237 35.2812 20.125 36.125 23 36.125C26.6562 36.125 29.7575 34.8512 32.3037 32.3037C34.8512 29.7575 36.125 26.6562 36.125 23C36.125 19.3437 34.8512 16.2419 32.3037 13.6944C29.7575 11.1481 26.6562 9.875 23 9.875C20.8438 9.875 18.8281 10.375 16.9531 11.375C15.0781 12.375 13.5 13.75 12.2188 15.5H15.5C16.0312 15.5 16.4769 15.6794 16.8369 16.0381C17.1956 16.3981 17.375 16.8437 17.375 17.375C17.375 17.9062 17.1956 18.3512 16.8369 18.71C16.4769 19.07 16.0312 19.25 15.5 19.25H8C7.46875 19.25 7.02375 19.07 6.665 18.71C6.305 18.3512 6.125 17.9062 6.125 17.375V9.875C6.125 9.34375 6.305 8.89812 6.665 8.53813C7.02375 8.17938 7.46875 8 8 8C8.53125 8 8.97687 8.17938 9.33687 8.53813C9.69562 8.89812 9.875 9.34375 9.875 9.875V12.4062C11.4688 10.4062 13.4144 8.85937 15.7119 7.76562C18.0081 6.67187 20.4375 6.125 23 6.125C25.3438 6.125 27.5394 6.57 29.5869 7.46C31.6331 8.35125 33.4144 9.55437 34.9306 11.0694C36.4456 12.5856 37.6488 14.3669 38.54 16.4131C39.43 18.4606 39.875 20.6562 39.875 23C39.875 25.3437 39.43 27.5387 38.54 29.585C37.6488 31.6325 36.4456 33.4137 34.9306 34.9287C33.4144 36.445 31.6331 37.6487 29.5869 38.54C27.5394 39.43 25.3438 39.875 23 39.875Z"
        fill={props.fillColor}
      />
    </Svg>
  );
};
