# siteground-cpu-download
Siteground's web hosting offers a chart that shows the past 30 days of CPU seconds activity, but no option to download the data. This script will convert the chart to a downloadable .CSV file.

1. Open the page that has the "CPU Seconds" chart on Siteground (https://my.siteground.com > Services > Settings > Statistics)
2. Scroll down to the "CPU Seconds" chart.
3. Change the "View By" from "Hour" to "Day"
4. Make sure all the sites are visible in the chart. 
5. Open the Chrome Console. (Command-Option-j)
6. Paste the script (convert.js) in the console.
7. Hit return.
8. A .csv file will automatically download. 
