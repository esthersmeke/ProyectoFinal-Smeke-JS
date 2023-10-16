// Define a function to create the bubble chart
function createBubbleChart(runDataArray) {
  // Generate random shades of grey for each bubble
  const backgroundColors = runDataArray.map(() => getRandomGreyShade());

  new Chart("running-bubble-chart", {
    type: "bubble",
    data: {
      datasets: [
        {
          data: runDataArray.map((run) => ({
            x: run.Distance,
            y: run.Time,
            r: 11,
          })),
          backgroundColor: backgroundColors, // Use the generated shades of grey
          pointStyle: "circle", // Set pointStyle to 'circle' for bubbles
          borderColor: "rgba(0, 0, 0, 1)", // Set the border color to black
          borderWidth: 0.6, // Set the border width to 1px
          label: "My Runs",
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Distance (km)",
          },
          min: 0,
          max: 50,
        },
        y: {
          title: {
            display: true,
            text: "Time (hrs)",
          },
          min: 0,
          max: 4,
        },
      },
    },
  });
}

// Function to generate a random shade of grey
function getRandomGreyShade() {
  const greyValue = Math.floor(Math.random() * 128) + 128;
  return `rgba(${greyValue}, ${greyValue}, ${greyValue}, 0.8)`;
}

// Define an empty array to store run data
const runDataArray = [];

// Extract run data from local storage, if available
const storedRunData = JSON.parse(localStorage.getItem("runs"));
if (Array.isArray(storedRunData)) {
  runDataArray.push(...storedRunData);
}

// Call the createBubbleChart function with the run data
createBubbleChart(runDataArray);

// Function to add a run and update the chart
function addRunToChart(run) {
  runDataArray.push(run);
  // Update the local storage
  localStorage.setItem("runs", JSON.stringify(runDataArray));
  // Update the chart
  createBubbleChart(runDataArray);
  chart.update();
}
