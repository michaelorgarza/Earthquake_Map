#  United States Geological Survey on Earthquake Data
The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. The purpose of this project is to visualize earthquake data that has the ability to update in real-time (every 5 mins). 

## Getting Started
1. **Data Collection Process**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every constantly. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)  Datasets are given in a JSON representation. Used the URL of the JSON to pull in data for the visualization.
   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   Created a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.
  
  ![2-BasicMap](Images/2-BasicMap.png)
  
The second plots displays the relationship betwen the tectonic plats and seismic activity. For this visualization, one needs to pull in a second data set and visualize it along side the orignal set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.
  
  ![5-Advanced](Images/5-Advanced.png)

- - -
