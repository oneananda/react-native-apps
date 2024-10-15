# Quick Countdown Timer App

Welcome to the Quick Countdown Timer App! This simple yet effective application allows you to set a countdown timer, adjust the countdown duration, and start or stop the timer with ease.

## Features

- **Start and Stop Timer**: Easily toggle the timer on and off.
- **Adjustable Countdown**: Increase or decrease the countdown duration in preset increments.
- **Persistent Settings**: Your selected countdown time is saved using AsyncStorage, ensuring it remains consistent even after closing the app.
- **User-Friendly Interface**: Simple design with clear buttons and a readable timer display.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **React Native**: This app is built using React Native, so make sure you have the environment set up for React Native development.

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd quick-countdown-timer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the app:

   ```bash
   npm start
   ```

## Usage

1. **Toggle the Timer**: Press the "Timer ON" button to start the countdown. The button will turn green, indicating that the timer is active. Press it again to stop the timer, turning it red.
   
2. **Adjust the Time**: Use the "+" and "-" buttons to increase or decrease the countdown time. The timer displays the current countdown duration along with the remaining time.

3. **Timer Alerts**: When the countdown reaches zero, an alert will notify you that the timer has finished.

## Code Overview

The core functionality of the app is handled in the `OnOffButton` component. Here are some key parts of the code:

- **State Management**: 
  - `isOn`: Tracks whether the timer is active or not.
  - `selectedTime`: The time duration set for the countdown.
  - `timeLeft`: The remaining time for the countdown.
  - `isRunning`: Indicates if the timer is currently running.

- **Timer Logic**:
  - The countdown timer decreases every second using `setTimeout`, and updates the display accordingly.
  - The timer can be started, stopped, and adjusted dynamically.

- **Storage**: 
  - The `AsyncStorage` module is used to save and retrieve the initially selected time, allowing for persistent settings.

## Styling

The app employs a simple and clean design using React Native's `StyleSheet`. The colors and layouts are chosen to provide a clear user experience.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request or open an issue for discussion.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements

Thanks to the React Native community for their incredible tools and resources that make building mobile applications easier and more enjoyable!

